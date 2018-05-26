import lighthouse from './components/lighthouse'
import riverSound from './assets/water-river.ogg'
import leverSound0 from './assets/lever-turn0.ogg'
import leverSound1 from './assets/lever-turn1.ogg'
import anime from 'animejs'

export default {
    name: 'home',

    components: {
        lighthouse
    },

    data() {
        return {
            audioInstances: {},
            sounds: {
                river: riverSound
            },
            objects: {
                fishing: {
                    hook: {
                        el: null,
                        shadow: {
                            el: null
                        },
                        sounds: [],
                    },
                    line: {
                        el: null,
                        shadow: {
                            el: null,
                            tense: null
                        },
                        tense: null
                    },
                    pole: {
                        el: null,
                        sounds: []
                    }
                },
                fuseBox: {
                    sounds: [],
                    powerLever: {
                        el: null,
                        on: false,
                        sounds: [
                            leverSound0,
                            leverSound1
                        ],
                    }
                },
                toolBox: {
                    el: null,
                    sounds: []
                }
            }
        }
    },

    mounted() {
        //Todo: Fix bug regarding play() on start
        // The user needs to interact with the page before play() can be used.
        this.playSound(this.sounds.river, true);
        this.getElements()

        // Add eventlisteners for the interactive elements
        this.registerClickListener(this.get('clickFuseBox'), this.RunfuseBox)
        this.registerClickListener(this.get('clickFishing'), this.runGetFish)
    },

    methods: {

        registerClickListener(element, method) {
            element.addEventListener('click', e => {
                method(element)
            })
        },

        get(id) {
            return document.getElementById(id)
        },

        getDataValue(id) {
            return this.get(id).attributes.d.value;
        },

        /**
         * Get elements from svg and merge in to objects object.
         */
        getElements() {
            let o = this.objects;
            o.fuseBox.powerLever.el = this.get('powerLever')

            o.toolBox.el = this.get('toolBox')

            o.fishing.hook.el = this.get('fishingHook1')
            o.fishing.hook.shadow.el = this.get('fishingHookShadow')
            o.fishing.line.el = this.get('slack')
            o.fishing.line.tense = this.getDataValue('tense')
            o.fishing.line.shadow.el = this.get('fishingLineShadow')
            o.fishing.line.shadow.tense = this.getDataValue('fishingLineShadowTense')
        },

        RunfuseBox(el) {
            const lever = this.objects.fuseBox.powerLever;
            let options = {};

            // Play different sound & animation relative to lever status
            if(lever.on) {
                this.playSound(lever.sounds[0])
                options = {
                    rotateX: 0,
                    duration: 250,
                }
            } else {
                this.playSound(lever.sounds[1])
                options = {
                    rotateX: 3,
                    duration: 400,
                    delay: 50
                }
            }

            //toggle lever & animate
            lever.on ^= true;
            anime(Object.assign(options, {
                targets: lever.el,
                easing: 'easeInOutQuint'
            }));
        },

        runGetFish() {
            const el = this.objects.fishing;

            // "Drown" fishing hook
            let x = anime({
                targets: el.hook.el,
                easing: 'easeInOutBack',
                translateY: '12px',
                duration: 1000,
            })
            // animate shadow recordingly
            anime({
                targets: el.hook.shadow.el,
                easing: 'easeInOutBack',
                translateX: '-10.63px',
                duration: 1000,
            })

            // Make fishing line tense
            anime({
                targets: el.line.el,
                easing: 'easeInOutElastic',
                d: el.line.tense,
                duration: 1000,
                delay: 0,
            })
            // animate shadow recordingly
            anime({
                targets: el.line.shadow.el,
                easing: 'easeInOutElastic',
                d: el.line.shadow.tense,
                duration: 1000,
                delay: 0,
            })
            
        },

        /**
         * Toggles mute on all instances of audio.
         */
        toggleMute() {
            Object.values(this.audioInstances).map(a => a.muted ^= true)
        },

        /**
         * Plays a sound via HTMLMediaElement API
         *  Adds element to object for later manipulating
         *  - Even your backstreet boys collection is welcome here. 
         * @param {String} src 
         * @param {Boolean} [loop=false] 
         */
        playSound(src, loop = false) {
            const audioAlreadyExists = Object.keys(this.audioInstances).find(e => e == src);

            if (audioAlreadyExists) {
                const sound = this.audioInstances[src];                
                sound.load()
                sound.play()
            } else {
                let sound = new Audio(src);
                this.audioInstances[src] = sound;
                sound.loop = loop;
                sound.play();
            }
        }
    }
}