// colors.d.ts

declare module 'ColorsAndStyles' {
    export interface Colors {
        reset: string;
        black: string;
        red: string;
        green: string;
        yellow: string;
        blue: string;
        magenta: string;
        cyan: string;
        white: string;
        gray: string;
        brightRed: string;
        brightGreen: string;
        brightYellow: string;
        brightBlue: string;
        brightMagenta: string;
        brightCyan: string;
        brightWhite: string;
        orange: string;
        pink: string;
        teal: string;
        lavender: string;
        turquoise: string;
        gold: string;
        maroon: string;
        navy: string;
        olive: string;
        deepPurple: string;
        lime: string;
        indigo: string;
        skyBlue: string;
        lightPink: string;
        salmon: string;
        darkGreen: string;
        darkCyan: string;
        darkBlue: string;
    }

    export interface Styles {
        reset: string;
        bold: string;
        dim: string;
        italic: string;
        underline: string;
        inverse: string;
        hidden: string;
        strikethrough: string;
        blink: string;
        rapidBlink: string;
        doubleUnderline: string;
        overline: string;
    }

    export interface Background {
        black: string;
        red: string;
        green: string;
        yellow: string;
        blue: string;
        magenta: string;
        cyan: string;
        white: string;
    }

    const colors: Colors;
    const styles: Styles;
    const bg: Background;

    export { colors, styles, bg };
}
