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
                fuseBox: {
                    el: null,
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
        this.registerClickListener(this.objects.fuseBox.el, this.RunfuseBox)
    },

    methods: {

        registerClickListener(element, method) {
            element.addEventListener('click', e => {
                method(element)
            })
        },

        /**
         * Get elements from svg and merge in to objects object.
         */
        getElements() {
            let o = this.objects;
            o.fuseBox.el = document.getElementById('fuseBox')
            o.fuseBox.powerLever.el = document.getElementById('powerLever')
            o.toolBox.el = document.getElementById('toolBox')
        },

        RunfuseBox(el) {
            const lever = this.objects.fuseBox.powerLever;
            let options = {};
            // transform: rotateX(3deg);
            // transform - origin: 0px 0 100px;

            Play different sound & animation relative to lever status
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