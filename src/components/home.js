import lighthouse from './lighthouse'

export default {
    name: 'home',

    components: {
        lighthouse
    },

    data() {
        return {
        }
    },

    methods: {
        toggleMute() {
            this.$refs.riverSound.muted ^= true;
        }
    }
}