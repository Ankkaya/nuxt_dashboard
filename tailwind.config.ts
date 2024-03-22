import type { Config } from 'tailwindcss'
import scrollbar from 'tailwind-scrollbar'

export default <Partial<Config>>{
    plugins: [scrollbar({ nocompatible: true })],
}
