const { colors, styles, bg } = require('./colors');

class Logtastic {
    constructor() {
        this.colors = colors;
        this.styles = styles;
        this.bg = bg;

        this.default = {
            log: {
                color: 'white',
                style: '',
                bg: '',
            },
            warn: {
                color: 'yellow',
                style: 'bold',
                bg: '',
            },
            err: {
                color: 'red',
                style: 'bold',
                bg: '',
            }
        }
        this.mode = {
            silent: false,
            logging: {
                // TODO
                // im thinking i want user to provide the callback function that sends data to their db of choice
                // this allows them to use this logging in their current environment
                // as well as limits reliance on this to send requests
                toDB: {
                    query: '',
                    maxBatchCount: 10,
                    maxBatchTimeout: 50000,
                    batchedLogs: {
                        content: [],
                    }
                },
            }
        };
    }

    getErrorStack = () => new Error()
        .stack
        .split('\n')
        .slice(2)
        .join('\n') + '\n';

    getFormattedText = (text) => typeof text === 'string'
        ? text
        : text instanceof Error
            ? text.message
            : JSON.stringify(text, null, 2);

    setToDB(settings = {}) {
        const {
            query = this.mode.logging.toDB.query,
            maxBatchCount = this.mode.logging.toDB.maxBatchCount,
            maxBatchTimeout = this.mode.logging.toDB.maxBatchTimeout
        } = settings;

        if (!query || typeof query !== 'string') {
            this.warn(`query required in setToDB({ query: <queryValue> })`)
        } else {
            this.mode.logging.toDB.query = query;
            this.mode.logging.toDB.maxBatchCount = maxBatchCount;
            this.mode.logging.toDB.maxBatchTimeout = maxBatchTimeout;
            this.log(
                `dB set to
                query: ${this.mode.logging.toDB.query}
                maxBatchCount: ${this.mode.logging.toDB.maxBatchCount}
                maxBatchTimeout: ${this.mode.logging.toDB.maxBatchTimeout}`
            )
        }
    }


    /**
     *
     * This function logs a message with customizable color, style, and background. The content
     * of the message and its formatting can be customized using the 'text' parameter and the
     * 'options' object. If the 'override' option is true, the message is displayed regardless
     * of the logging mode. Otherwise, the message is displayed only if the logging mode is not
     * silent (or if overridden). Additionally, if logging to file mode is enabled, the message
     * is also written to a file. Timestamps and trace information can be added to the message
     * if specified in the 'options' object.
     *
     * @param {string|object} text - The text or object to be logged.
     * @param {Object} [options={}] - Options for styling and logging the message.
     *   @param {string} [options.color] - The text color to apply to the message.
     *   @param {string} [options.style] - The text style to apply to the message.
     *   @param {string} [options.bgStyle] - The background color for the message.
     *   @param {boolean} [options.time=false] - Whether to include a timestamp in the message.
     *   @param {boolean} [options.override=false] - Forcefully override the logging mode.
     *   @param {boolean} [options.trace=false] - Whether to include stack trace information.
     * @returns {void}
     */
    log(text, options = {}) {
        const {
            color = this.default.log.color,
            style = this.default.log.style,
            bgStyle = this.default.log.bg,
            time = false,
            override = false,
            trace = false
        } = options;

        if (this.mode.silent && !override) {
            return;
        }

        const appliedColors = this.colors[color] || "";
        const appliedStyles = this.styles[style] || "";
        const appliedBg = this.bg[bgStyle] || "";

        const timestamp = time ? new Date().toLocaleString() + '\n' : '';

        const traceStack =
            trace
                ? this.getErrorStack()
                : '';

        try {
            let formattedText = this.getFormattedText(text);
            console.log(
                `${appliedColors}${appliedStyles}${appliedBg}${timestamp}${formattedText}${trace && '\n' + traceStack || ''}${this.colors.reset}${this.styles.reset}`
            );
        } catch (err) {
            console.warn('Issue with Logtastic. Which is not very logtastic of it');
            console.error(err);
        }
    }


    /**
     *
     * This function logs a warning message with customizable color, style, and background.
     * The content of the warning message and its formatting can be customized using the 'text'
     * parameter and the 'options' object. If the 'override' option is true, the warning message
     * is displayed regardless of the logging mode. Otherwise, the warning message is displayed
     * only if the logging mode is not silent (or if overridden). Additionally, if logging to file
     * mode is enabled, the warning message is also written to a file. Timestamps and trace information
     * can be added to the message if specified in the 'options' object.
     *
     * @param {string|object} text - The text or object to be logged as a warning message.
     * @param {Object} [options={}] - Options for styling and logging the warning.
     *   @param {string} [options.color] - The text color to apply to the warning message.
     *   @param {string} [options.style] - The text style to apply to the warning message.
     *   @param {string} [options.bgStyle] - The background color for the warning message.
     *   @param {boolean} [options.time=false] - Whether to include a timestamp in the message.
     *   @param {boolean} [options.override=false] - Forcefully override the logging mode.
     *   @param {boolean} [options.trace=false] - Whether to include stack trace information.
     * @returns {void}
     */
    warn(text, options = {}) {
        const {
            color = this.default.warn.color,
            style = this.default.warn.style,
            bgStyle = this.default.warn.bg,
            time = false,
            override = false,
            trace = false
        } = options;

        if (this.mode.silent && !override) {
            return;
        }

        const appliedColors = this.colors[color] || "";
        const appliedStyles = this.styles[style] || "";
        const appliedBg = this.bg[bgStyle] || "";

        const timestamp = time ? new Date().toLocaleString() + '\n' : '';
        const traceStack =
            trace
                ? this.getErrorStack()
                : '';

        try {
            let formattedText = this.getFormattedText(text);
            console.log(`${appliedColors}${appliedStyles}${appliedBg}${timestamp}${formattedText}${trace && '\n' + traceStack || ''}${this.colors.reset}${this.styles.reset}`);
        } catch (err) {
            console.warn('Issue with Logtastic. Which is not very logtastic of it');
            console.error(err);
        }
    }


    /**
     *
     * This function logs an error message with customizable color, style, and background. The content
     * of the error message and its formatting can be customized using the 'text' parameter and the
     * 'options' object. If the 'override' option is true, the error message is displayed regardless
     * of the logging mode. Otherwise, the error message is displayed only if the logging mode is not
     * silent (or if overridden). Additionally, if logging to file mode is enabled, the error message
     * is also written to a file. Timestamps, trace information, and the ability to force an exit (if specified)
     * can be added to the message if specified in the 'options' object.
     *
     * @param {string|object} text - The text or object to be logged as an error message.
     * @param {Object} [options={}] - Options for styling and logging the error.
     *   @param {string} [options.color] - The text color to apply to the error message.
     *   @param {string} [options.style] - The text style to apply to the error message.
     *   @param {string} [options.bgStyle] - The background color for the error message.
     *   @param {boolean} [options.time=true] - Whether to include a timestamp in the message.
     *   @param {boolean} [options.override=false] - Forcefully override the logging mode.
     *   @param {boolean} [options.trace=true] - Whether to include stack trace information.
     *   @param {boolean} [options.escape=true] - Whether to forcefully exit the application after logging.
     * @returns {void}
     */
    err(text, options = {}) {
        const {
            color = this.default.warn.color,
            style = this.default.warn.style,
            bgStyle = this.default.warn.bg,
            time = true,
            override = false,
            trace = true,
            escape = true
        } = options;

        if (this.mode.silent && !override) {
            return
        }

        const appliedColors = this.colors[color] || "";
        const appliedStyles = this.styles[style] || "";
        const appliedBg = this.bg[bgStyle] || "";

        const timestamp =
            time
                ? new Date().toLocaleString() + '\n'
                : '';

        const traceStack =
            trace
                ? this.getErrorStack()
                : '';

        try {
            const formattedText = this.getFormattedText(text);
            console.log(`${appliedColors}${appliedStyles}${appliedBg}${timestamp}${formattedText}${trace && '\n' + traceStack || ''}${this.colors.reset}${this.styles.reset}`);
            if (escape) process.exit(1);
        } catch (err) {
            console.warn('Issue with Logtastic. Which is not very logtastic of it');
            console.error(err);
        }
    }


    /**
     * Display default settings and configuration instructions.
     *
     * Logs a message to the console displaying the default settings and provides
     * instructions on how users can modify these settings. The function logs a series
     * of messages with blue color and an override option to ensure consistent styling.
     *
     * @returns {void}
     */
    getDefaults() {
        this.log(
            `Your default settings are:`,
            { color: 'blue', override: true }
        );
        this.log(
            this.default,
            { color: 'blue', override: true }
        );
        this.log(
            `You can change these settings by using:\nIE: logger.setDefaults({ color: "white", style: "bold", type: 'log'|'warn'|'err' })`,
            { override: true }
        );
    }


    /**
     * Set default log message formatting options.
     *
     * Modifies the default settings for log message formatting, including color, style,
     * and background style. Accepts an options object containing color, style, and bgStyle.
     * If provided options are valid, the function updates the corresponding default value
     * and logs a status message confirming the change. If an option is invalid, an error
     * message is logged.
     *
     * @param {Object} options - Options for updating default formatting settings.
     *   @param {string} [options.color] - The text color to set as the default.
     *     Possible values: 'reset', 'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'.
     *   @param {string} [options.style] - The text style to set as the default.
     *     Possible values: 'reset', 'bold', 'dim', 'italic', 'underline', 'inverse', 'hidden', 'strikethrough'.
     *   @param {string} [options.bgStyle] - The background color to set as the default.
     *     Possible values: 'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'.
     *   @param {string} [options.type] - The type of log you are setting the default of.
     *     Possible values: 'log', 'warn', 'err'
     * @returns {void}ll
     */
    setDefaults(options = {}) {
        const { color, style, bgStyle, type } = options;

        const validTypes = ['log', 'warn', 'err'];

        if (!validTypes.includes(type)) {
            this.log(`Your chosen type '${type}' is not valid. Please choose from: ${validTypes}`,
                { color: 'red', override: true }
            );
            return;
        }

        let status = '';

        if (color) {l
            if (!this.colors[color]) {
                this.log(
                    `The color '${color}' is not valid.\nPlease choose from the following options:${Object.keys(this.colors).map((item) => ' ' + item)}`,
                    { color: 'red', override: true }
                );
            } else {
                this.default[type].color = color;
                status += `Default color set to: ${color}\n`;
            }
        }

        if (style) {
            if (!this.styles[style]) {
                this.log(
                    `The style '${style}' is not valid.\nPlease choose from the following options:${Object.keys(this.styles).map((item) => ' ' + item)}`,
                    { color: 'red', override: true }
                );
            } else {
                this.default[type].style = style;
                status += `Default style set to: ${style}\n`;
            }
        }

        if (bgStyle) {
            if (!this.bg[bgStyle]) {
                this.log(
                    `The background style '${bgStyle}' is not valid.\nPlease choose from the following options:${Object.keys(this.bg).map((item) => ' ' + item)}`,
                    { color: 'red', override: true }
                );
            } else {
                this.default[type].bg = bgStyle;
                status += `Default background style set to: ${bgStyle}\n`;
            }
        }

        this.log(status);
    }


    getMode() {
        this.log(
            `Your current mode is:`,
            { color: 'blue', override: true }
        );
        this.log(
            this.mode,
            { color: 'blue', override: true }
        );
        this.log(
            `You can change these settings by using:\nIE: logger.setMode({ silent: true/false })`,
            { override: true }
        );
    }


    /**
     * Set the logging mode to control log visibility.
     *
     * Modifies the logging mode to control whether log messages are visible or not.
     * Accepts an options object containing a `silent` property. If the `silent` property
     * is set to `true`, log messages will not be visible; if set to `false`, log messages
     * will be visible.
     *
     * @param {Object} options - Options for updating logging mode.
     *   @param {boolean} [options.silent] - If true, activates silent mode (logs are not visible).
     * @returns {void}
     */
    setMode(options = {}) {
        const { silent } = options;
        if (silent && !!silent) {
            this.mode.silent = silent;
        }
        this.log(
            `Silent mode is ${silent && 'active, logs will not be visible' || 'inactive, logs will be visible'}`,
            { override: true }
        )
    }



    /**
     *
     * This function returns helper message and give detail of tool overview.
     *
     * @returns {void}
     */
    help() {
        this.log(`   
┓          • 
┃ ┏┓┏┓╋┏┓┏╋┓┏
┗┛┗┛┗┫┗┗┻┛┗┗┗
     ┛ ┓   ┓  
       ┣┓┏┓┃┏┓
       ┛┗┗ ┗┣┛
            ┛`)
        this.log(`
Logtastic is a versatile Node.js logging utility that allows you to easily log messages, warnings, and errors with customizable formatting options. 
It provides flexibility in adjusting text color, style, background color, and more. 
You can also choose to log messages to files, databases, or both.
`, { style: 'dim' });
        this.log(`Usage:`, { style: 'bold', color: 'blue' });
        this.log(`NodeJS:  const logger = require('@ofrepose/logtastic');
ReactJS: import Logtastic from '@ofrepose/logtastic';`,
            { color: 'blue' });
        this.log(`
Example Usage: 
logger.log(data, { color: "blue", bgStyle: "yellow" });
logger.warn('example text' { color: "yellow", style: "underline" });
logger.err(err, { escape: false });`,
            { color: 'olive' });
        this.log(`
Colors:`, { style: 'doubleUnderline', color: 'blue' });
        this.log(`reset         black
red           green
yellow        blue
magenta       cyan
white         gray
brightRed     brightGreen
brightYellow  brightBlue
brightMagenta brightCyan
brightWhite   orange
pink          teal
lavender      turquoise
gold          maroon
navy          olive
deepPurple    lime
indigo        skyBlue
lightPink     salmon
darkGreen     darkCyan
darkBlue`,
            { color: 'blue' });

        this.log(`
bgStyle: (Background Style)`, { style: 'doubleUnderline', color: 'blue' });
        this.log(`black         red
green         yellow
blue          magenta
cyan          white`,
            { color: 'blue' });
        this.log(`
style`, { style: 'doubleUnderline', color: 'blue' });
        this.log(`reset         bold
dim           italic
underline     inverse
hidden        strikethrough
blink         rapidBlink
overline      doubleUnderline`,
            { color: 'blue' });

        this.log(`
logger.log(text, options)

Log a message with customizable formatting options.

- text: The message text or object to be logged.
- options: An object containing formatting options such as:
    - color: Text color for the message.
    - style: Text style for the message.
    - bgStyle: Background style for the message.
    - time: Whether to include a timestamp in the message (default: false).
    - override: Forcefully override the logging mode (default: false).
    - trace: Whether to include stack trace information (default: false).

logger.warn(text, options)

Log a warning message with customizable formatting options.

- text: The warning message text or object to be logged.
- options: An object containing formatting options such as:
    - color: Text color for the warning message.
    - style: Text style for the warning message.
    - bgStyle: Background style for the warning message.
    - time: Whether to include a timestamp in the message (default: false).
    - override: Forcefully override the logging mode (default: false).
    - trace: Whether to include stack trace information (default: false).

logger.err(text, options)

Log an error message with customizable formatting options.

- text: The error message text or object to be logged.
- options: An object containing formatting options such as:
    - color: Text color for the error message.
    - style: Text style for the error message.
    - bgStyle: Background style for the error message.
    - time: Whether to include a timestamp in the message (default: true).
    - override: Forcefully override the logging mode (default: false).
    - trace: Whether to include stack trace information (default: true).
    - escape: Whether to forcefully exit the application after logging (default: true).

logger.setMode(options)

Set the logging mode to control log visibility.

- options: An object containing a silent property. If silent is true, logs will not be visible.

logger.setDefaults(options)

Set default log message formatting options.

- options: An object containing options to update default formatting settings, including:
    - color: Default text color.
    - style: Default text style.
    - bgStyle: Default background style.
    - type: Type of log you are editing default type for ('log', 'warn', or 'err').

logger.getMode()

Display the current logging mode and its configuration.

logger.getDefaults()

Display the default settings and provide instructions on modifying them.`, { style: 'dim' });
    }



}

module.exports = new Logtastic();