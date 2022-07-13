import { defineStore } from 'pinia'

export default defineStore('device', {
    state: () => ({
        id: '',
        style: {
            layout: 'default',
            colors: {
                frame: 'default',
                background: 'default'
            },
        }
    }),
    actions: {
        setLayout(layout) {
            this.style.layout = layout
        },
        setFrame(frame) {
            this.style.colors.frame = frame
        },
        setBackground(background) {
            this.style.colors.background = background
        },
        setStyle(layout, frame, background) {
            this.style.layout = layout
            this.style.colors.frame = frame
            this.style.colors.background = background
        }
    }
})