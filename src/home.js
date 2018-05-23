import lighthouse from './components/lighthouse'
import riverSound from './assets/water-river.ogg'

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
            }
        }
    },

    mounted() {
        this.playSound(this.sounds.river, true)        
    },

    methods: {

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