interface Thenable<T> {
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult>(onfulfilled?: (value: T) => TResult | Thenable<TResult>, onrejected?: (reason: any) => TResult | Thenable<TResult>): Thenable<TResult>;

    then<TResult>(onfulfilled?: (value: T) => TResult | Thenable<TResult>, onrejected?: (reason: any) => void): Thenable<TResult>;
}

export interface IDisposable {
    dispose(): void;
}

export interface IEvent<T> {
    (listener: (e: T) => any, thisArg?: any): IDisposable;
}

/**
 * A helper that allows to emit and listen to typed events
 */
export interface Emitter<T> {
    readonly event: IEvent<T>;

    fire(event?: T): void;

    dispose(): void;
}

export enum Severity {
    Ignore = 0,
    Info = 1,
    Warning = 2,
    Error = 3,
}

/**
 * The value callback to complete a promise
 */
export interface TValueCallback<T> {
    (value: T | Thenable<T>): void;
}

export interface ProgressCallback {
    (progress: any): any;
}

/**
 * A Promise implementation that supports progress and cancelation.
 */
export interface Promise<V> {
    then<U>(success?: (value: V) => Promise<U>, error?: (err: any) => Promise<U>, progress?: ProgressCallback): Promise<U>;

    then<U>(success?: (value: V) => Promise<U>, error?: (err: any) => Promise<U> | U, progress?: ProgressCallback): Promise<U>;

    then<U>(success?: (value: V) => Promise<U>, error?: (err: any) => U, progress?: ProgressCallback): Promise<U>;

    then<U>(success?: (value: V) => Promise<U>, error?: (err: any) => void, progress?: ProgressCallback): Promise<U>;

    then<U>(success?: (value: V) => Promise<U> | U, error?: (err: any) => Promise<U>, progress?: ProgressCallback): Promise<U>;

    then<U>(success?: (value: V) => Promise<U> | U, error?: (err: any) => Promise<U> | U, progress?: ProgressCallback): Promise<U>;

    then<U>(success?: (value: V) => Promise<U> | U, error?: (err: any) => U, progress?: ProgressCallback): Promise<U>;

    then<U>(success?: (value: V) => Promise<U> | U, error?: (err: any) => void, progress?: ProgressCallback): Promise<U>;

    then<U>(success?: (value: V) => U, error?: (err: any) => Promise<U>, progress?: ProgressCallback): Promise<U>;

    then<U>(success?: (value: V) => U, error?: (err: any) => Promise<U> | U, progress?: ProgressCallback): Promise<U>;

    then<U>(success?: (value: V) => U, error?: (err: any) => U, progress?: ProgressCallback): Promise<U>;

    then<U>(success?: (value: V) => U, error?: (err: any) => void, progress?: ProgressCallback): Promise<U>;

    done(success?: (value: V) => void, error?: (err: any) => any, progress?: ProgressCallback): void;

    cancel(): void;
}

export interface CancellationTokenSource {
    readonly token: CancellationToken;

    cancel(): void;

    dispose(): void;
}

export interface CancellationToken {
    readonly isCancellationRequested: boolean;

    /**
     * An event emitted when cancellation is requested
     * @event
     */
    readonly onCancellationRequested: IEvent<any>;
}

/**
 * Uniform Resource Identifier (Uri) http://tools.ietf.org/html/rfc3986.
 * This class is a simple parser which creates the basic component paths
 * (http://tools.ietf.org/html/rfc3986#section-3) with minimal validation
 * and encoding.
 *
 *       foo://example.com:8042/over/there?name=ferret#nose
 *       \_/   \______________/\_________/ \_________/ \__/
 *        |           |            |            |        |
 *     scheme     authority       path        query   fragment
 *        |   _____________________|__
 *       / \ /                        \
 *       urn:example:animal:ferret:nose
 *
 *
 */
export interface Uri {
    /**
     * scheme is the 'http' part of 'http://www.msft.com/some/path?query#fragment'.
     * The part before the first colon.
     */
    readonly scheme: string;

    /**
     * authority is the 'www.msft.com' part of 'http://www.msft.com/some/path?query#fragment'.
     * The part between the first double slashes and the next slash.
     */
    readonly authority: string;

    /**
     * path is the '/some/path' part of 'http://www.msft.com/some/path?query#fragment'.
     */
    readonly path: string;

    /**
     * query is the 'query' part of 'http://www.msft.com/some/path?query#fragment'.
     */
    readonly query: string;

    /**
     * fragment is the 'fragment' part of 'http://www.msft.com/some/path?query#fragment'.
     */
    readonly fragment: string;

    /**
     * Returns a string representing the corresponding file system path of this Uri.
     * Will handle UNC paths and normalize windows drive letters to lower-case. Also
     * uses the platform specific path separator. Will *not* validate the path for
     * invalid characters and semantics. Will *not* look at the scheme of this Uri.
     */
    readonly fsPath: string;

    with(change: {
        scheme?: string;
        authority?: string;
        path?: string;
        query?: string;
        fragment?: string;
    }): Uri;

    /**
     *
     * @param skipEncoding Do not encode the result, default is `false`
     */
    toString(skipEncoding?: boolean): string;

    toJSON(): any;
}

/**
 * Virtual Key Codes, the value does not hold any inherent meaning.
 * Inspired somewhat from https://msdn.microsoft.com/en-us/library/windows/desktop/dd375731(v=vs.85).aspx
 * But these are "more general", as they should work across browsers & OS`s.
 */
export enum KeyCode {
    /**
     * Placed first to cover the 0 value of the enum.
     */
    Unknown = 0,
    Backspace = 1,
    Tab = 2,
    Enter = 3,
    Shift = 4,
    Ctrl = 5,
    Alt = 6,
    PauseBreak = 7,
    CapsLock = 8,
    Escape = 9,
    Space = 10,
    PageUp = 11,
    PageDown = 12,
    End = 13,
    Home = 14,
    LeftArrow = 15,
    UpArrow = 16,
    RightArrow = 17,
    DownArrow = 18,
    Insert = 19,
    Delete = 20,
    KEY_0 = 21,
    KEY_1 = 22,
    KEY_2 = 23,
    KEY_3 = 24,
    KEY_4 = 25,
    KEY_5 = 26,
    KEY_6 = 27,
    KEY_7 = 28,
    KEY_8 = 29,
    KEY_9 = 30,
    KEY_A = 31,
    KEY_B = 32,
    KEY_C = 33,
    KEY_D = 34,
    KEY_E = 35,
    KEY_F = 36,
    KEY_G = 37,
    KEY_H = 38,
    KEY_I = 39,
    KEY_J = 40,
    KEY_K = 41,
    KEY_L = 42,
    KEY_M = 43,
    KEY_N = 44,
    KEY_O = 45,
    KEY_P = 46,
    KEY_Q = 47,
    KEY_R = 48,
    KEY_S = 49,
    KEY_T = 50,
    KEY_U = 51,
    KEY_V = 52,
    KEY_W = 53,
    KEY_X = 54,
    KEY_Y = 55,
    KEY_Z = 56,
    Meta = 57,
    ContextMenu = 58,
    F1 = 59,
    F2 = 60,
    F3 = 61,
    F4 = 62,
    F5 = 63,
    F6 = 64,
    F7 = 65,
    F8 = 66,
    F9 = 67,
    F10 = 68,
    F11 = 69,
    F12 = 70,
    F13 = 71,
    F14 = 72,
    F15 = 73,
    F16 = 74,
    F17 = 75,
    F18 = 76,
    F19 = 77,
    NumLock = 78,
    ScrollLock = 79,
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     * For the US standard keyboard, the ';:' key
     */
    US_SEMICOLON = 80,
    /**
     * For any country/region, the '+' key
     * For the US standard keyboard, the '=+' key
     */
    US_EQUAL = 81,
    /**
     * For any country/region, the ',' key
     * For the US standard keyboard, the ',<' key
     */
    US_COMMA = 82,
    /**
     * For any country/region, the '-' key
     * For the US standard keyboard, the '-_' key
     */
    US_MINUS = 83,
    /**
     * For any country/region, the '.' key
     * For the US standard keyboard, the '.>' key
     */
    US_DOT = 84,
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     * For the US standard keyboard, the '/?' key
     */
    US_SLASH = 85,
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     * For the US standard keyboard, the '`~' key
     */
    US_BACKTICK = 86,
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     * For the US standard keyboard, the '[{' key
         */
    US_OPEN_SQUARE_BRACKET = 87,
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     * For the US standard keyboard, the '\|' key
     */
    US_BACKSLASH = 88,
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     * For the US standard keyboard, the ']}' key
     */
    US_CLOSE_SQUARE_BRACKET = 89,
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     * For the US standard keyboard, the ''"' key
     */
    US_QUOTE = 90,
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     */
    OEM_8 = 91,
    /**
     * Either the angle bracket key or the backslash key on the RT 102-key keyboard.
     */
    OEM_102 = 92,
    NUMPAD_0 = 93,
    NUMPAD_1 = 94,
    NUMPAD_2 = 95,
    NUMPAD_3 = 96,
    NUMPAD_4 = 97,
    NUMPAD_5 = 98,
    NUMPAD_6 = 99,
    NUMPAD_7 = 100,
    NUMPAD_8 = 101,
    NUMPAD_9 = 102,
    NUMPAD_MULTIPLY = 103,
    NUMPAD_ADD = 104,
    NUMPAD_SEPARATOR = 105,
    NUMPAD_SUBTRACT = 106,
    NUMPAD_DECIMAL = 107,
    NUMPAD_DIVIDE = 108,
    /**
     * Cover all key codes when IME is processing input.
     */
    KEY_IN_COMPOSITION = 109,
    ABNT_C1 = 110,
    ABNT_C2 = 111,
    /**
     * Placed last to cover the length of the enum.
     * Please do not depend on this value!
     */
    MAX_VALUE = 112,
}

export interface KeyMod {
}

/**
 * MarkedString can be used to render human readable text. It is either a markdown string
 * or a code-block that provides a language and a code snippet. Note that
 * markdown strings will be sanitized - that means html will be escaped.
 */
export type MarkedString = string | {
    readonly language: string;
    readonly value: string;
};

export interface IKeyboardEvent {
    readonly browserEvent: KeyboardEvent;
    readonly target: HTMLElement;
    readonly ctrlKey: boolean;
    readonly shiftKey: boolean;
    readonly altKey: boolean;
    readonly metaKey: boolean;
    readonly keyCode: KeyCode;
    readonly code: string;

    equals(keybinding: number): boolean;

    preventDefault(): void;

    stopPropagation(): void;
}

export interface IMouseEvent {
    readonly browserEvent: MouseEvent;
    readonly leftButton: boolean;
    readonly middleButton: boolean;
    readonly rightButton: boolean;
    readonly target: HTMLElement;
    readonly detail: number;
    readonly posx: number;
    readonly posy: number;
    readonly ctrlKey: boolean;
    readonly shiftKey: boolean;
    readonly altKey: boolean;
    readonly metaKey: boolean;
    readonly timestamp: number;

    preventDefault(): void;

    stopPropagation(): void;
}

export interface IScrollEvent {
    readonly scrollTop: number;
    readonly scrollLeft: number;
    readonly scrollWidth: number;
    readonly scrollHeight: number;
    readonly scrollTopChanged: boolean;
    readonly scrollLeftChanged: boolean;
    readonly scrollWidthChanged: boolean;
    readonly scrollHeightChanged: boolean;
}

/**
 * A position in the editor. This interface is suitable for serialization.
 */
export interface IPosition {
    /**
     * line number (starts at 1)
     */
    readonly lineNumber: number;
    /**
     * column (the first character in a line is between column 1 and column 2)
     */
    readonly column: number;
}

/**
 * A position in the editor.
 */
export interface Position {
    /**
     * line number (starts at 1)
     */
    readonly lineNumber: number;
    /**
     * column (the first character in a line is between column 1 and column 2)
     */
    readonly column: number;

    /**
     * Test if this position equals other position
     */
    equals(other: IPosition): boolean;

    /**
     * Test if this position is before other position.
     * If the two positions are equal, the result will be false.
     */
    isBefore(other: IPosition): boolean;

    /**
     * Test if this position is before other position.
     * If the two positions are equal, the result will be true.
     */
    isBeforeOrEqual(other: IPosition): boolean;

    /**
     * Clone this position.
     */
    clone(): Position;

    /**
     * Convert to a human-readable representation.
     */
    toString(): string;
}

/**
 * A range in the editor. This interface is suitable for serialization.
 */
export interface IRange {
    /**
     * Line number on which the range starts (starts at 1).
     */
    readonly startLineNumber: number;
    /**
     * Column on which the range starts in line `startLineNumber` (starts at 1).
     */
    readonly startColumn: number;
    /**
     * Line number on which the range ends.
     */
    readonly endLineNumber: number;
    /**
     * Column on which the range ends in line `endLineNumber`.
     */
    readonly endColumn: number;
}

/**
 * A range in the editor. (startLineNumber,startColumn) is <= (endLineNumber,endColumn)
 */
export interface Range {
    /**
     * Line number on which the range starts (starts at 1).
     */
    readonly startLineNumber: number;
    /**
     * Column on which the range starts in line `startLineNumber` (starts at 1).
     */
    readonly startColumn: number;
    /**
     * Line number on which the range ends.
     */
    readonly endLineNumber: number;
    /**
     * Column on which the range ends in line `endLineNumber`.
     */
    readonly endColumn: number;

    /**
     * Test if this range is empty.
     */
    isEmpty(): boolean;

    /**
     * Test if position is in this range. If the position is at the edges, will return true.
     */
    containsPosition(position: IPosition): boolean;

    /**
     * Test if range is in this range. If the range is equal to this range, will return true.
     */
    containsRange(range: IRange): boolean;

    /**
     * A reunion of the two ranges.
     * The smallest position will be used as the start point, and the largest one as the end point.
     */
    plusRange(range: IRange): Range;

    /**
     * A intersection of the two ranges.
     */
    intersectRanges(range: IRange): Range;

    /**
     * Test if this range equals other.
     */
    equalsRange(other: IRange): boolean;

    /**
     * Return the end position (which will be after or equal to the start position)
     */
    getEndPosition(): Position;

    /**
     * Return the start position (which will be before or equal to the end position)
     */
    getStartPosition(): Position;

    /**
     * Clone this range.
     */
    cloneRange(): Range;

    /**
     * Transform to a user presentable string representation.
     */
    toString(): string;

    /**
     * Create a new range using this range's start position, and using endLineNumber and endColumn as the end position.
     */
    setEndPosition(endLineNumber: number, endColumn: number): Range;

    /**
     * Create a new range using this range's end position, and using startLineNumber and startColumn as the start position.
     */
    setStartPosition(startLineNumber: number, startColumn: number): Range;

    /**
     * Create a new empty range using this range's start position.
     */
    collapseToStart(): Range;
}

/**
 * A selection in the editor.
 * The selection is a range that has an orientation.
 */
export interface ISelection {
    /**
     * The line number on which the selection has started.
     */
    readonly selectionStartLineNumber: number;
    /**
     * The column on `selectionStartLineNumber` where the selection has started.
     */
    readonly selectionStartColumn: number;
    /**
     * The line number on which the selection has ended.
     */
    readonly positionLineNumber: number;
    /**
     * The column on `positionLineNumber` where the selection has ended.
     */
    readonly positionColumn: number;
}

/**
 * A selection in the editor.
 * The selection is a range that has an orientation.
 */
export interface Selection extends Range {
    /**
     * The line number on which the selection has started.
     */
    readonly selectionStartLineNumber: number;
    /**
     * The column on `selectionStartLineNumber` where the selection has started.
     */
    readonly selectionStartColumn: number;
    /**
     * The line number on which the selection has ended.
     */
    readonly positionLineNumber: number;
    /**
     * The column on `positionLineNumber` where the selection has ended.
     */
    readonly positionColumn: number;

    /**
     * Clone this selection.
     */
    clone(): Selection;

    /**
     * Transform to a human-readable representation.
     */
    toString(): string;

    /**
     * Test if equals other selection.
     */
    equalsSelection(other: ISelection): boolean;

    /**
     * Get directions (LTR or RTL).
     */
    getDirection(): SelectionDirection;

    /**
     * Create a new selection with a different `positionLineNumber` and `positionColumn`.
     */
    setEndPosition(endLineNumber: number, endColumn: number): Selection;

    /**
     * Get the position at `positionLineNumber` and `positionColumn`.
     */
    getPosition(): Position;

    /**
     * Create a new selection with a different `selectionStartLineNumber` and `selectionStartColumn`.
     */
    setStartPosition(startLineNumber: number, startColumn: number): Selection;
}

/**
 * The direction of a selection.
 */
export enum SelectionDirection {
    /**
     * The selection starts above where it ends.
     */
    LTR = 0,
    /**
     * The selection starts below where it ends.
     */
    RTL = 1,
}

export interface Token {
    _tokenBrand: void;
    readonly offset: number;
    readonly type: string;
    readonly language: string;

    toString(): string;
}
