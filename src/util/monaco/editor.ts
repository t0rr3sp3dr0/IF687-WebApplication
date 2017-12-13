import {
    IDisposable,
    IKeyboardEvent,
    IMouseEvent,
    IPosition,
    IRange,
    IScrollEvent,
    ISelection,
    MarkedString,
    Severity,
    Uri,
} from '.';

export interface IDiffNavigator {
    revealFirst: boolean;

    canNavigate(): boolean;

    next(): void;

    previous(): void;

    dispose(): void;
}

export interface IDiffNavigatorOptions {
    readonly followsCaret?: boolean;
    readonly ignoreCharChanges?: boolean;
    readonly alwaysRevealFirst?: boolean;
}

export type BuiltinTheme = 'vs' | 'vs-dark' | 'hc-black';

export interface IStandaloneThemeData {
    base: BuiltinTheme;
    inherit: boolean;
    rules: ITokenThemeRule[];
    colors: IColors;
}

export type IColors = {
    [colorId: string]: string;
};

export interface ITokenThemeRule {
    token: string;
    foreground?: string;
    background?: string;
    fontStyle?: string;
}

/**
 * A web worker that can provide a proxy to an arbitrary file.
 */
export interface MonacoWebWorker<T> {
    /**
     * Terminate the web worker, thus invalidating the returned proxy.
     */
    dispose(): void;

    /**
     * Get a proxy to the arbitrary loaded code.
     */
    getProxy(): Promise<T>;

    /**
     * Synchronize (send) the models at `resources` to the web worker,
     * making them available in the monaco.worker.getMirrorModels().
     */
    withSyncedResources(resources: Uri[]): Promise<T>;
}

export interface IWebWorkerOptions {
    /**
     * The AMD moduleId to load.
     * It should export a function `create` that should return the exported proxy.
     */
    moduleId: string;
    /**
     * The data to send over when calling create on the module.
     */
    createData?: any;
    /**
     * A label to be used to identify the web worker for debugging purposes.
     */
    label?: string;
}

/**
 * The options to create an editor.
 */
export interface IEditorConstructionOptions extends IEditorOptions {
    /**
     * The initial model associated with this code editor.
     */
    model?: IModel;
    /**
     * The initial value of the auto created model in the editor.
     * To not create automatically a model, use `model: null`.
     */
    value?: string;
    /**
     * The initial language of the auto created model in the editor.
     * To not create automatically a model, use `model: null`.
     */
    language?: string;
    /**
     * Initial theme to be used for rendering.
     * The current out-of-the-box available themes are: 'vs' (default), 'vs-dark', 'hc-black'.
     * You can create custom themes via `monaco.editor.defineTheme`.
     * To switch a theme, use `monaco.editor.setTheme`
     */
    theme?: string;
    /**
     * An URL to open when Ctrl+H (Windows and Linux) or Cmd+H (OSX) is pressed in
     * the accessibility help dialog in the editor.
     *
     * Defaults to "https://go.microsoft.com/fwlink/?linkid=852450"
     */
    accessibilityHelpUrl?: string;
}

/**
 * The options to create a diff editor.
 */
export interface IDiffEditorConstructionOptions extends IDiffEditorOptions {
    /**
     * Initial theme to be used for rendering.
     * The current out-of-the-box available themes are: 'vs' (default), 'vs-dark', 'hc-black'.
     * You can create custom themes via `monaco.editor.defineTheme`.
     * To switch a theme, use `monaco.editor.setTheme`
     */
    theme?: string;
}

export interface IStandaloneCodeEditor extends ICodeEditor {
    addCommand(keybinding: number, handler: ICommandHandler, context: string): string;

    createContextKey<T>(key: string, defaultValue: T): IContextKey<T>;

    addAction(descriptor: IActionDescriptor): IDisposable;
}

export interface IStandaloneDiffEditor extends IDiffEditor {
    addCommand(keybinding: number, handler: ICommandHandler, context: string): string;

    createContextKey<T>(key: string, defaultValue: T): IContextKey<T>;

    addAction(descriptor: IActionDescriptor): IDisposable;

    getOriginalEditor(): IStandaloneCodeEditor;

    getModifiedEditor(): IStandaloneCodeEditor;
}

export interface ICommandHandler {
    (...args: any[]): void;
}

export interface IContextKey<T> {
    set(value: T): void;

    reset(): void;

    get(): T;
}

export interface IEditorOverrideServices {
    [index: string]: any;
}

export interface IMarker {
    owner: string;
    resource: Uri;
    severity: Severity;
    code?: string;
    message: string;
    source?: string;
    startLineNumber: number;
    startColumn: number;
    endLineNumber: number;
    endColumn: number;
}

/**
 * A structure defining a problem/warning/etc.
 */
export interface IMarkerData {
    code?: string;
    severity: Severity;
    message: string;
    source?: string;
    startLineNumber: number;
    startColumn: number;
    endLineNumber: number;
    endColumn: number;
}

export interface IColorizerOptions {
    tabSize?: number;
}

export interface IColorizerElementOptions extends IColorizerOptions {
    theme?: string;
    mimeType?: string;
}

export enum ScrollbarVisibility {
    Auto = 1,
    Hidden = 2,
    Visible = 3,
}

export interface ThemeColor {
    id: string;
}

/**
 * Vertical Lane in the overview ruler of the editor.
 */
export enum OverviewRulerLane {
    Left = 1,
    Center = 2,
    Right = 4,
    Full = 7,
}

/**
 * Options for rendering a model decoration in the overview ruler.
 */
export interface IModelDecorationOverviewRulerOptions {
    /**
     * CSS color to render in the overview ruler.
     * e.g.: rgba(100, 100, 100, 0.5) or a color from the color registry
     */
    color: string | ThemeColor;
    /**
     * CSS color to render in the overview ruler.
     * e.g.: rgba(100, 100, 100, 0.5) or a color from the color registry
     */
    darkColor: string | ThemeColor;
    /**
     * CSS color to render in the overview ruler.
     * e.g.: rgba(100, 100, 100, 0.5) or a color from the color registry
     */
    hcColor?: string | ThemeColor;
    /**
     * The position in the overview ruler.
     */
    position: OverviewRulerLane;
}

/**
 * Options for a model decoration.
 */
export interface IModelDecorationOptions {
    /**
     * Customize the growing behavior of the decoration when typing at the edges of the decoration.
     * Defaults to TrackedRangeStickiness.AlwaysGrowsWhenTypingAtEdges
     */
    stickiness?: TrackedRangeStickiness;
    /**
     * CSS class name describing the decoration.
     */
    className?: string;
    /**
     * Message to be rendered when hovering over the glyph margin decoration.
     */
    glyphMarginHoverMessage?: MarkedString | MarkedString[];
    /**
     * Array of MarkedString to render as the decoration message.
     */
    hoverMessage?: MarkedString | MarkedString[];
    /**
     * Should the decoration expand to encompass a whole line.
     */
    isWholeLine?: boolean;
    /**
     * If set, render this decoration in the overview ruler.
     */
    overviewRuler?: IModelDecorationOverviewRulerOptions;
    /**
     * If set, the decoration will be rendered in the glyph margin with this CSS class name.
     */
    glyphMarginClassName?: string;
    /**
     * If set, the decoration will be rendered in the lines decorations with this CSS class name.
     */
    linesDecorationsClassName?: string;
    /**
     * If set, the decoration will be rendered in the margin (covering its full width) with this CSS class name.
     */
    marginClassName?: string;
    /**
     * If set, the decoration will be rendered inline with the text with this CSS class name.
     * Please use this only for CSS rules that must impact the text. For example, use `className`
     * to have a background color decoration.
     */
    inlineClassName?: string;
    /**
     * If set, the decoration will be rendered before the text with this CSS class name.
     */
    beforeContentClassName?: string;
    /**
     * If set, the decoration will be rendered after the text with this CSS class name.
     */
    afterContentClassName?: string;
}

/**
 * New model decorations.
 */
export interface IModelDeltaDecoration {
    /**
     * Range that this decoration covers.
     */
    range: IRange;
    /**
     * Options associated with this decoration.
     */
    options: IModelDecorationOptions;
}

/**
 * A decoration in the model.
 */
export interface IModelDecoration {
    /**
     * Identifier for a decoration.
     */
    readonly id: string;
    /**
     * Identifier for a decoration's owener.
     */
    readonly ownerId: number;
    /**
     * Range that this decoration covers.
     */
    readonly range: Range;
    /**
     * Options associated with this decoration.
     */
    readonly options: IModelDecorationOptions;
    /**
     * A flag describing if this is a problem decoration (e.g. warning/error).
     */
    readonly isForValidation: boolean;
}

/**
 * Word inside a model.
 */
export interface IWordAtPosition {
    /**
     * The word.
     */
    readonly word: string;
    /**
     * The column where the word starts.
     */
    readonly startColumn: number;
    /**
     * The column where the word ends.
     */
    readonly endColumn: number;
}

/**
 * End of line character preference.
 */
export enum EndOfLinePreference {
    /**
     * Use the end of line character identified in the text buffer.
     */
    TextDefined = 0,
    /**
     * Use line feed (\n) as the end of line character.
     */
    LF = 1,
    /**
     * Use carriage return and line feed (\r\n) as the end of line character.
     */
    CRLF = 2,
}

/**
 * The default end of line to use when instantiating models.
 */
export enum DefaultEndOfLine {
    /**
     * Use line feed (\n) as the end of line character.
     */
    LF = 1,
    /**
     * Use carriage return and line feed (\r\n) as the end of line character.
     */
    CRLF = 2,
}

/**
 * End of line character preference.
 */
export enum EndOfLineSequence {
    /**
     * Use line feed (\n) as the end of line character.
     */
    LF = 0,
    /**
     * Use carriage return and line feed (\r\n) as the end of line character.
     */
    CRLF = 1,
}

/**
 * An identifier for a single edit operation.
 */
export interface ISingleEditOperationIdentifier {
    /**
     * Identifier major
     */
    major: number;
    /**
     * Identifier minor
     */
    minor: number;
}

/**
 * A builder and helper for edit operations for a command.
 */
export interface IEditOperationBuilder {
    /**
     * Add a new edit operation (a replace operation).
     * @param range The range to replace (delete). May be empty to represent a simple insert.
     * @param text The text to replace with. May be null to represent a simple delete.
     */
    addEditOperation(range: Range, text: string): void;

    /**
     * Add a new edit operation (a replace operation).
     * The inverse edits will be accessible in `ICursorStateComputerData.getInverseEditOperations()`
     * @param range The range to replace (delete). May be empty to represent a simple insert.
     * @param text The text to replace with. May be null to represent a simple delete.
     */
    addTrackedEditOperation(range: Range, text: string): void;

    /**
     * Track `selection` when applying edit operations.
     * A best effort will be made to not grow/expand the selection.
     * An empty selection will clamp to a nearby character.
     * @param selection The selection to track.
     * @param trackPreviousOnEmpty If set, and the selection is empty, indicates whether the selection
     *           should clamp to the previous or the next character.
     * @return A unique identifer.
     */
    trackSelection(selection: Selection, trackPreviousOnEmpty?: boolean): string;
}

/**
 * A helper for computing cursor state after a command.
 */
export interface ICursorStateComputerData {
    /**
     * Get the inverse edit operations of the added edit operations.
     */
    getInverseEditOperations(): IIdentifiedSingleEditOperation[];

    /**
     * Get a previously tracked selection.
     * @param id The unique identifier returned by `trackSelection`.
     * @return The selection.
     */
    getTrackedSelection(id: string): Selection;
}

/**
 * A command that modifies text / cursor state on a model.
 */
export interface ICommand {
    /**
     * Get the edit operations needed to execute this command.
     * @param model The model the command will execute on.
     * @param builder A helper to collect the needed edit operations and to track selections.
     */
    getEditOperations(model: ITokenizedModel, builder: IEditOperationBuilder): void;

    /**
     * Compute the cursor state after the edit operations were applied.
     * @param model The model the commad has executed on.
     * @param helper A helper to get inverse edit operations and to get previously tracked selections.
     * @return The cursor state after the command executed.
     */
    computeCursorState(model: ITokenizedModel, helper: ICursorStateComputerData): Selection;
}

/**
 * A single edit operation, that acts as a simple replace.
 * i.e. Replace text at `range` with `text` in model.
 */
export interface ISingleEditOperation {
    /**
     * The range to replace. This can be empty to emulate a simple insert.
     */
    range: IRange;
    /**
     * The text to replace with. This can be null to emulate a simple delete.
     */
    text: string;
    /**
     * This indicates that this operation has "insert" semantics.
     * i.e. forceMoveMarkers = true => if `range` is collapsed, all markers at the position will be moved.
     */
    forceMoveMarkers?: boolean;
}

/**
 * A single edit operation, that has an identifier.
 */
export interface IIdentifiedSingleEditOperation {
    /**
     * An identifier associated with this single edit operation.
     */
    identifier: ISingleEditOperationIdentifier;
    /**
     * The range to replace. This can be empty to emulate a simple insert.
     */
    range: Range;
    /**
     * The text to replace with. This can be null to emulate a simple delete.
     */
    text: string;
    /**
     * This indicates that this operation has "insert" semantics.
     * i.e. forceMoveMarkers = true => if `range` is collapsed, all markers at the position will be moved.
     */
    forceMoveMarkers: boolean;
    /**
     * This indicates that this operation is inserting automatic whitespace
     * that can be removed on next model edit operation if `config.trimAutoWhitespace` is true.
     */
    isAutoWhitespaceEdit?: boolean;
}

/**
 * A callback that can compute the cursor state after applying a series of edit operations.
 */
export interface ICursorStateComputer {
    /**
     * A callback that can compute the resulting cursors state after some edit operations have been executed.
     */
    (inverseEditOperations: IIdentifiedSingleEditOperation[]): Selection[];
}

export class TextModelResolvedOptions {
    _textModelResolvedOptionsBrand: void;
    readonly tabSize: number;
    readonly insertSpaces: boolean;
    readonly defaultEOL: DefaultEndOfLine;
    readonly trimAutoWhitespace: boolean;
}

export interface ITextModelUpdateOptions {
    tabSize?: number;
    insertSpaces?: boolean;
    trimAutoWhitespace?: boolean;
}

/**
 * A textual read-only model.
 */
export interface ITextModel {
    /**
     * Get the resolved options for this model.
     */
    getOptions(): TextModelResolvedOptions;

    /**
     * Get the current version id of the model.
     * Anytime a change happens to the model (even undo/redo),
     * the version id is incremented.
     */
    getVersionId(): number;

    /**
     * Get the alternative version id of the model.
     * This alternative version id is not always incremented,
     * it will return the same values in the case of undo-redo.
     */
    getAlternativeVersionId(): number;

    /**
     * Replace the entire text buffer value contained in this model.
     */
    setValue(newValue: string): void;

    /**
     * Get the text stored in this model.
     * @param eol The end of line character preference. Defaults to `EndOfLinePreference.TextDefined`.
     * @param preserverBOM Preserve a BOM character if it was detected when the model was constructed.
     * @return The text.
     */
    getValue(eol?: EndOfLinePreference, preserveBOM?: boolean): string;

    /**
     * Get the length of the text stored in this model.
     */
    getValueLength(eol?: EndOfLinePreference, preserveBOM?: boolean): number;

    /**
     * Get the text in a certain range.
     * @param range The range describing what text to get.
     * @param eol The end of line character preference. This will only be used for multiline ranges. Defaults to `EndOfLinePreference.TextDefined`.
     * @return The text.
     */
    getValueInRange(range: IRange, eol?: EndOfLinePreference): string;

    /**
     * Get the length of text in a certain range.
     * @param range The range describing what text length to get.
     * @return The text length.
     */
    getValueLengthInRange(range: IRange): number;

    /**
     * Get the number of lines in the model.
     */
    getLineCount(): number;

    /**
     * Get the text for a certain line.
     */
    getLineContent(lineNumber: number): string;

    /**
     * Get the text for all lines.
     */
    getLinesContent(): string[];

    /**
     * Get the end of line sequence predominantly used in the text buffer.
     * @return EOL char sequence (e.g.: '\n' or '\r\n').
     */
    getEOL(): string;

    /**
     * Change the end of line sequence used in the text buffer.
     */
    setEOL(eol: EndOfLineSequence): void;

    /**
     * Get the minimum legal column for line at `lineNumber`
     */
    getLineMinColumn(lineNumber: number): number;

    /**
     * Get the maximum legal column for line at `lineNumber`
     */
    getLineMaxColumn(lineNumber: number): number;

    /**
     * Returns the column before the first non whitespace character for line at `lineNumber`.
     * Returns 0 if line is empty or contains only whitespace.
     */
    getLineFirstNonWhitespaceColumn(lineNumber: number): number;

    /**
     * Returns the column after the last non whitespace character for line at `lineNumber`.
     * Returns 0 if line is empty or contains only whitespace.
     */
    getLineLastNonWhitespaceColumn(lineNumber: number): number;

    /**
     * Create a valid position,
     */
    validatePosition(position: IPosition): Position;

    /**
     * Advances the given position by the given offest (negative offsets are also accepted)
     * and returns it as a new valid position.
     *
     * If the offset and position are such that their combination goes beyond the beginning or
     * end of the model, throws an exception.
     *
     * If the ofsset is such that the new position would be in the middle of a multi-byte
     * line terminator, throws an exception.
     */
    modifyPosition(position: IPosition, offset: number): Position;

    /**
     * Create a valid range.
     */
    validateRange(range: IRange): Range;

    /**
     * Converts the position to a zero-based offset.
     *
     * The position will be [adjusted](#TextDocument.validatePosition).
     *
     * @param position A position.
     * @return A valid zero-based offset.
     */
    getOffsetAt(position: IPosition): number;

    /**
     * Converts a zero-based offset to a position.
     *
     * @param offset A zero-based offset.
     * @return A valid [position](#Position).
     */
    getPositionAt(offset: number): Position;

    /**
     * Get a range covering the entire model
     */
    getFullModelRange(): Range;

    /**
     * Returns iff the model was disposed or not.
     */
    isDisposed(): boolean;

    /**
     * Search the model.
     * @param searchString The string used to search. If it is a regular expression, set `isRegex` to true.
     * @param searchOnlyEditableRange Limit the searching to only search inside the editable range of the model.
     * @param isRegex Used to indicate that `searchString` is a regular expression.
     * @param matchCase Force the matching to match lower/upper case exactly.
     * @param wordSeparators Force the matching to match entire words only. Pass null otherwise.
     * @param captureMatches The result will contain the captured groups.
     * @param limitResultCount Limit the number of results
     * @return The ranges where the matches are. It is empty if not matches have been found.
     */
    findMatches(searchString: string, searchOnlyEditableRange: boolean, isRegex: boolean, matchCase: boolean, wordSeparators: string, captureMatches: boolean, limitResultCount?: number): FindMatch[];

    /**
     * Search the model.
     * @param searchString The string used to search. If it is a regular expression, set `isRegex` to true.
     * @param searchScope Limit the searching to only search inside this range.
     * @param isRegex Used to indicate that `searchString` is a regular expression.
     * @param matchCase Force the matching to match lower/upper case exactly.
     * @param wordSeparators Force the matching to match entire words only. Pass null otherwise.
     * @param captureMatches The result will contain the captured groups.
     * @param limitResultCount Limit the number of results
     * @return The ranges where the matches are. It is empty if no matches have been found.
     */
    findMatches(searchString: string, searchScope: IRange, isRegex: boolean, matchCase: boolean, wordSeparators: string, captureMatches: boolean, limitResultCount?: number): FindMatch[];

    /**
     * Search the model for the next match. Loops to the beginning of the model if needed.
     * @param searchString The string used to search. If it is a regular expression, set `isRegex` to true.
     * @param searchStart Start the searching at the specified position.
     * @param isRegex Used to indicate that `searchString` is a regular expression.
     * @param matchCase Force the matching to match lower/upper case exactly.
     * @param wordSeparators Force the matching to match entire words only. Pass null otherwise.
     * @param captureMatches The result will contain the captured groups.
     * @return The range where the next match is. It is null if no next match has been found.
     */
    findNextMatch(searchString: string, searchStart: IPosition, isRegex: boolean, matchCase: boolean, wordSeparators: string, captureMatches: boolean): FindMatch;

    /**
     * Search the model for the previous match. Loops to the end of the model if needed.
     * @param searchString The string used to search. If it is a regular expression, set `isRegex` to true.
     * @param searchStart Start the searching at the specified position.
     * @param isRegex Used to indicate that `searchString` is a regular expression.
     * @param matchCase Force the matching to match lower/upper case exactly.
     * @param wordSeparators Force the matching to match entire words only. Pass null otherwise.
     * @param captureMatches The result will contain the captured groups.
     * @return The range where the previous match is. It is null if no previous match has been found.
     */
    findPreviousMatch(searchString: string, searchStart: IPosition, isRegex: boolean, matchCase: boolean, wordSeparators: string, captureMatches: boolean): FindMatch;
}

export class FindMatch {
    _findMatchBrand: void;
    readonly range: Range;
    readonly matches: string[];
}

export interface IReadOnlyModel extends ITextModel {
    /**
     * Gets the resource associated with this editor model.
     */
    readonly uri: Uri;

    /**
     * Get the language associated with this model.
     */
    getModeId(): string;

    /**
     * Get the word under or besides `position`.
     * @param position The position to look for a word.
     * @param skipSyntaxTokens Ignore syntax tokens, as identified by the mode.
     * @return The word under or besides `position`. Might be null.
     */
    getWordAtPosition(position: IPosition): IWordAtPosition;

    /**
     * Get the word under or besides `position` trimmed to `position`.column
     * @param position The position to look for a word.
     * @param skipSyntaxTokens Ignore syntax tokens, as identified by the mode.
     * @return The word under or besides `position`. Will never be null.
     */
    getWordUntilPosition(position: IPosition): IWordAtPosition;
}

/**
 * A model that is tokenized.
 */
export interface ITokenizedModel extends ITextModel {
    /**
     * Get the language associated with this model.
     */
    getModeId(): string;

    /**
     * Get the word under or besides `position`.
     * @param position The position to look for a word.
     * @param skipSyntaxTokens Ignore syntax tokens, as identified by the mode.
     * @return The word under or besides `position`. Might be null.
     */
    getWordAtPosition(position: IPosition): IWordAtPosition;

    /**
     * Get the word under or besides `position` trimmed to `position`.column
     * @param position The position to look for a word.
     * @param skipSyntaxTokens Ignore syntax tokens, as identified by the mode.
     * @return The word under or besides `position`. Will never be null.
     */
    getWordUntilPosition(position: IPosition): IWordAtPosition;
}

/**
 * A model that can track markers.
 */
export interface ITextModelWithMarkers extends ITextModel {
}

/**
 * Describes the behavior of decorations when typing/editing near their edges.
 * Note: Please do not edit the values, as they very carefully match `DecorationRangeBehavior`
 */
export enum TrackedRangeStickiness {
    AlwaysGrowsWhenTypingAtEdges = 0,
    NeverGrowsWhenTypingAtEdges = 1,
    GrowsOnlyWhenTypingBefore = 2,
    GrowsOnlyWhenTypingAfter = 3,
}

/**
 * A model that can have decorations.
 */
export interface ITextModelWithDecorations {
    /**
     * Perform a minimum ammount of operations, in order to transform the decorations
     * identified by `oldDecorations` to the decorations described by `newDecorations`
     * and returns the new identifiers associated with the resulting decorations.
     *
     * @param oldDecorations Array containing previous decorations identifiers.
     * @param newDecorations Array describing what decorations should result after the call.
     * @param ownerId Identifies the editor id in which these decorations should appear. If no `ownerId` is provided, the decorations will appear in all editors that attach this model.
     * @return An array containing the new decorations identifiers.
     */
    deltaDecorations(oldDecorations: string[], newDecorations: IModelDeltaDecoration[], ownerId?: number): string[];

    /**
     * Get the options associated with a decoration.
     * @param id The decoration id.
     * @return The decoration options or null if the decoration was not found.
     */
    getDecorationOptions(id: string): IModelDecorationOptions;

    /**
     * Get the range associated with a decoration.
     * @param id The decoration id.
     * @return The decoration range or null if the decoration was not found.
     */
    getDecorationRange(id: string): Range;

    /**
     * Gets all the decorations for the line `lineNumber` as an array.
     * @param lineNumber The line number
     * @param ownerId If set, it will ignore decorations belonging to other owners.
     * @param filterOutValidation If set, it will ignore decorations specific to validation (i.e. warnings, errors).
     * @return An array with the decorations
     */
    getLineDecorations(lineNumber: number, ownerId?: number, filterOutValidation?: boolean): IModelDecoration[];

    /**
     * Gets all the decorations for the lines between `startLineNumber` and `endLineNumber` as an array.
     * @param startLineNumber The start line number
     * @param endLineNumber The end line number
     * @param ownerId If set, it will ignore decorations belonging to other owners.
     * @param filterOutValidation If set, it will ignore decorations specific to validation (i.e. warnings, errors).
     * @return An array with the decorations
     */
    getLinesDecorations(startLineNumber: number, endLineNumber: number, ownerId?: number, filterOutValidation?: boolean): IModelDecoration[];

    /**
     * Gets all the deocorations in a range as an array. Only `startLineNumber` and `endLineNumber` from `range` are used for filtering.
     * So for now it returns all the decorations on the same line as `range`.
     * @param range The range to search in
     * @param ownerId If set, it will ignore decorations belonging to other owners.
     * @param filterOutValidation If set, it will ignore decorations specific to validation (i.e. warnings, errors).
     * @return An array with the decorations
     */
    getDecorationsInRange(range: IRange, ownerId?: number, filterOutValidation?: boolean): IModelDecoration[];

    /**
     * Gets all the decorations as an array.
     * @param ownerId If set, it will ignore decorations belonging to other owners.
     * @param filterOutValidation If set, it will ignore decorations specific to validation (i.e. warnings, errors).
     */
    getAllDecorations(ownerId?: number, filterOutValidation?: boolean): IModelDecoration[];
}

/**
 * An editable text model.
 */
export interface IEditableTextModel extends ITextModelWithMarkers {
    /**
     * Normalize a string containing whitespace according to indentation rules (converts to spaces or to tabs).
     */
    normalizeIndentation(str: string): string;

    /**
     * Get what is considered to be one indent (e.g. a tab character or 4 spaces, etc.).
     */
    getOneIndent(): string;

    /**
     * Change the options of this model.
     */
    updateOptions(newOpts: ITextModelUpdateOptions): void;

    /**
     * Detect the indentation options for this model from its content.
     */
    detectIndentation(defaultInsertSpaces: boolean, defaultTabSize: number): void;

    /**
     * Push a stack element onto the undo stack. This acts as an undo/redo point.
     * The idea is to use `pushEditOperations` to edit the model and then to
     * `pushStackElement` to create an undo/redo stop point.
     */
    pushStackElement(): void;

    /**
     * Push edit operations, basically editing the model. This is the preferred way
     * of editing the model. The edit operations will land on the undo stack.
     * @param beforeCursorState The cursor state before the edit operaions. This cursor state will be returned when `undo` or `redo` are invoked.
     * @param editOperations The edit operations.
     * @param cursorStateComputer A callback that can compute the resulting cursors state after the edit operations have been executed.
     * @return The cursor state returned by the `cursorStateComputer`.
     */
    pushEditOperations(beforeCursorState: Selection[], editOperations: IIdentifiedSingleEditOperation[], cursorStateComputer: ICursorStateComputer): Selection[];

    /**
     * Edit the model without adding the edits to the undo stack.
     * This can have dire consequences on the undo stack! See @pushEditOperations for the preferred way.
     * @param operations The edit operations.
     * @return The inverse edit operations, that, when applied, will bring the model back to the previous state.
     */
    applyEdits(operations: IIdentifiedSingleEditOperation[]): IIdentifiedSingleEditOperation[];
}

/**
 * A model.
 */
export interface IModel extends IReadOnlyModel, IEditableTextModel, ITextModelWithMarkers, ITokenizedModel, ITextModelWithDecorations {
    /**
     * A unique identifier associated with this model.
     */
    readonly id: string;

    /**
     * An event emitted when the contents of the model have changed.
     * @event
     */
    onDidChangeContent(listener: (e: IModelContentChangedEvent) => void): IDisposable;

    /**
     * An event emitted when decorations of the model have changed.
     * @event
     */
    onDidChangeDecorations(listener: (e: IModelDecorationsChangedEvent) => void): IDisposable;

    /**
     * An event emitted when the model options have changed.
     * @event
     */
    onDidChangeOptions(listener: (e: IModelOptionsChangedEvent) => void): IDisposable;

    /**
     * An event emitted when the language associated with the model has changed.
     * @event
     */
    onDidChangeLanguage(listener: (e: IModelLanguageChangedEvent) => void): IDisposable;

    /**
     * An event emitted right before disposing the model.
     * @event
     */
    onWillDispose(listener: () => void): IDisposable;

    /**
     * Destroy this model. This will unbind the model from the mode
     * and make all necessary clean-up to release this object to the GC.
     */
    dispose(): void;
}

/**
 * A model for the diff editor.
 */
export interface IDiffEditorModel {
    /**
     * Original model.
     */
    original: IModel;
    /**
     * Modified model.
     */
    modified: IModel;
}

/**
 * An event describing that an editor has had its model reset (i.e. `editor.setModel()`).
 */
export interface IModelChangedEvent {
    /**
     * The `uri` of the previous model or null.
     */
    readonly oldModelUrl: Uri;
    /**
     * The `uri` of the new model or null.
     */
    readonly newModelUrl: Uri;
}

export interface IDimension {
    width: number;
    height: number;
}

/**
 * A change
 */
export interface IChange {
    readonly originalStartLineNumber: number;
    readonly originalEndLineNumber: number;
    readonly modifiedStartLineNumber: number;
    readonly modifiedEndLineNumber: number;
}

/**
 * A character level change.
 */
export interface ICharChange extends IChange {
    readonly originalStartColumn: number;
    readonly originalEndColumn: number;
    readonly modifiedStartColumn: number;
    readonly modifiedEndColumn: number;
}

/**
 * A line change
 */
export interface ILineChange extends IChange {
    readonly charChanges: ICharChange[];
}

/**
 * Information about a line in the diff editor
 */
export interface IDiffLineInformation {
    readonly equivalentLineNumber: number;
}

export interface INewScrollPosition {
    scrollLeft?: number;
    scrollTop?: number;
}

/**
 * Description of an action contribution
 */
export interface IActionDescriptor {
    /**
     * An unique identifier of the contributed action.
     */
    id: string;
    /**
     * A label of the action that will be presented to the user.
     */
    label: string;
    /**
     * Precondition rule.
     */
    precondition?: string;
    /**
     * An array of keybindings for the action.
     */
    keybindings?: number[];
    /**
     * The keybinding rule (condition on top of precondition).
     */
    keybindingContext?: string;
    /**
     * Control if the action should show up in the context menu and where.
     * The context menu of the editor has these default:
     *   navigation - The navigation group comes first in all cases.
     *   1_modification - This group comes next and contains commands that modify your code.
     *   9_cutcopypaste - The last default group with the basic editing commands.
     * You can also create your own group.
     * Defaults to null (don't show in context menu).
     */
    contextMenuGroupId?: string;
    /**
     * Control the order in the context menu group.
     */
    contextMenuOrder?: number;

    /**
     * Method that will be executed when the action is triggered.
     * @param editor The editor instance is passed in as a convinience
     */
    run(editor: ICommonCodeEditor): void | Promise<void>;
}

export interface IEditorAction {
    readonly id: string;
    readonly label: string;
    readonly alias: string;

    isSupported(): boolean;

    run(): Promise<void>;
}

export type IEditorModel = IModel | IDiffEditorModel;

/**
 * A (serializable) state of the cursors.
 */
export interface ICursorState {
    inSelectionMode: boolean;
    selectionStart: IPosition;
    position: IPosition;
}

/**
 * A (serializable) state of the view.
 */
export interface IViewState {
    scrollTop: number;
    scrollTopWithoutViewZones: number;
    scrollLeft: number;
}

/**
 * A (serializable) state of the code editor.
 */
export interface ICodeEditorViewState {
    cursorState: ICursorState[];
    viewState: IViewState;
    contributionsState: {
        [id: string]: any;
    };
}

/**
 * (Serializable) View state for the diff editor.
 */
export interface IDiffEditorViewState {
    original: ICodeEditorViewState;
    modified: ICodeEditorViewState;
}

/**
 * An editor view state.
 */
export type IEditorViewState = ICodeEditorViewState | IDiffEditorViewState;

/**
 * An editor.
 */
export interface IEditor {
    /**
     * An event emitted when the editor has been disposed.
     * @event
     */
    onDidDispose(listener: () => void): IDisposable;

    /**
     * Dispose the editor.
     */
    dispose(): void;

    /**
     * Get a unique id for this editor instance.
     */
    getId(): string;

    /**
     * Get the editor type. Please see `EditorType`.
     * This is to avoid an instanceof check
     */
    getEditorType(): string;

    /**
     * Update the editor's options after the editor has been created.
     */
    updateOptions(newOptions: IEditorOptions): void;

    /**
     * Instructs the editor to remeasure its container. This method should
     * be called when the container of the editor gets resized.
     */
    layout(dimension?: IDimension): void;

    /**
     * Brings browser focus to the editor text
     */
    focus(): void;

    /**
     * Returns true if this editor has keyboard focus (e.g. cursor is blinking).
     */
    isFocused(): boolean;

    /**
     * Returns all actions associated with this editor.
     */
    getActions(): IEditorAction[];

    /**
     * Returns all actions associated with this editor.
     */
    getSupportedActions(): IEditorAction[];

    /**
     * Saves current view state of the editor in a serializable object.
     */
    saveViewState(): IEditorViewState;

    /**
     * Restores the view state of the editor from a serializable object generated by `saveViewState`.
     */
    restoreViewState(state: IEditorViewState): void;

    /**
     * Given a position, returns a column number that takes tab-widths into account.
     */
    getVisibleColumnFromPosition(position: IPosition): number;

    /**
     * Returns the primary position of the cursor.
     */
    getPosition(): Position;

    /**
     * Set the primary position of the cursor. This will remove any secondary cursors.
     * @param position New primary cursor's position
     */
    setPosition(position: IPosition): void;

    /**
     * Scroll vertically as necessary and reveal a line.
     */
    revealLine(lineNumber: number): void;

    /**
     * Scroll vertically as necessary and reveal a line centered vertically.
     */
    revealLineInCenter(lineNumber: number): void;

    /**
     * Scroll vertically as necessary and reveal a line centered vertically only if it lies outside the viewport.
     */
    revealLineInCenterIfOutsideViewport(lineNumber: number): void;

    /**
     * Scroll vertically or horizontally as necessary and reveal a position.
     */
    revealPosition(position: IPosition, revealVerticalInCenter?: boolean, revealHorizontal?: boolean): void;

    /**
     * Scroll vertically or horizontally as necessary and reveal a position centered vertically.
     */
    revealPositionInCenter(position: IPosition): void;

    /**
     * Scroll vertically or horizontally as necessary and reveal a position centered vertically only if it lies outside the viewport.
     */
    revealPositionInCenterIfOutsideViewport(position: IPosition): void;

    /**
     * Returns the primary selection of the editor.
     */
    getSelection(): Selection;

    /**
     * Returns all the selections of the editor.
     */
    getSelections(): Selection[];

    /**
     * Set the primary selection of the editor. This will remove any secondary cursors.
     * @param selection The new selection
     */
    setSelection(selection: IRange): void;

    /**
     * Set the primary selection of the editor. This will remove any secondary cursors.
     * @param selection The new selection
     */
    setSelection(selection: Range): void;

    /**
     * Set the primary selection of the editor. This will remove any secondary cursors.
     * @param selection The new selection
     */
    setSelection(selection: ISelection): void;

    /**
     * Set the primary selection of the editor. This will remove any secondary cursors.
     * @param selection The new selection
     */
    setSelection(selection: Selection): void;

    /**
     * Set the selections for all the cursors of the editor.
     * Cursors will be removed or added, as necessary.
     */
    setSelections(selections: ISelection[]): void;

    /**
     * Scroll vertically as necessary and reveal lines.
     */
    revealLines(startLineNumber: number, endLineNumber: number): void;

    /**
     * Scroll vertically as necessary and reveal lines centered vertically.
     */
    revealLinesInCenter(lineNumber: number, endLineNumber: number): void;

    /**
     * Scroll vertically as necessary and reveal lines centered vertically only if it lies outside the viewport.
     */
    revealLinesInCenterIfOutsideViewport(lineNumber: number, endLineNumber: number): void;

    /**
     * Scroll vertically or horizontally as necessary and reveal a range.
     */
    revealRange(range: IRange): void;

    /**
     * Scroll vertically or horizontally as necessary and reveal a range centered vertically.
     */
    revealRangeInCenter(range: IRange): void;

    /**
     * Scroll vertically or horizontally as necessary and reveal a range at the top of the viewport.
     */
    revealRangeAtTop(range: IRange): void;

    /**
     * Scroll vertically or horizontally as necessary and reveal a range centered vertically only if it lies outside the viewport.
     */
    revealRangeInCenterIfOutsideViewport(range: IRange): void;

    /**
     * Directly trigger a handler or an editor action.
     * @param source The source of the call.
     * @param handlerId The id of the handler or the id of a contribution.
     * @param payload Extra data to be sent to the handler.
     */
    trigger(source: string, handlerId: string, payload: any): void;

    /**
     * Gets the current model attached to this editor.
     */
    getModel(): IEditorModel;

    /**
     * Sets the current model attached to this editor.
     * If the previous model was created by the editor via the value key in the options
     * literal object, it will be destroyed. Otherwise, if the previous model was set
     * via setModel, or the model key in the options literal object, the previous model
     * will not be destroyed.
     * It is safe to call setModel(null) to simply detach the current model from the editor.
     */
    setModel(model: IEditorModel): void;
}

/**
 * An editor contribution that gets created every time a new editor gets created and gets disposed when the editor gets disposed.
 */
export interface IEditorContribution {
    /**
     * Get a unique identifier for this contribution.
     */
    getId(): string;

    /**
     * Dispose this contribution.
     */
    dispose(): void;

    /**
     * Store view state.
     */
    saveViewState?(): any;

    /**
     * Restore view state.
     */
    restoreViewState?(state: any): void;
}

export interface ICommonCodeEditor extends IEditor {
    /**
     * An event emitted when the content of the current model has changed.
     * @event
     */
    onDidChangeModelContent(listener: (e: IModelContentChangedEvent) => void): IDisposable;

    /**
     * An event emitted when the language of the current model has changed.
     * @event
     */
    onDidChangeModelLanguage(listener: (e: IModelLanguageChangedEvent) => void): IDisposable;

    /**
     * An event emitted when the options of the current model has changed.
     * @event
     */
    onDidChangeModelOptions(listener: (e: IModelOptionsChangedEvent) => void): IDisposable;

    /**
     * An event emitted when the configuration of the editor has changed. (e.g. `editor.updateOptions()`)
     * @event
     */
    onDidChangeConfiguration(listener: (e: IConfigurationChangedEvent) => void): IDisposable;

    /**
     * An event emitted when the cursor position has changed.
     * @event
     */
    onDidChangeCursorPosition(listener: (e: ICursorPositionChangedEvent) => void): IDisposable;

    /**
     * An event emitted when the cursor selection has changed.
     * @event
     */
    onDidChangeCursorSelection(listener: (e: ICursorSelectionChangedEvent) => void): IDisposable;

    /**
     * An event emitted when the model of this editor has changed (e.g. `editor.setModel()`).
     * @event
     */
    onDidChangeModel(listener: (e: IModelChangedEvent) => void): IDisposable;

    /**
     * An event emitted when the decorations of the current model have changed.
     * @event
     */
    onDidChangeModelDecorations(listener: (e: IModelDecorationsChangedEvent) => void): IDisposable;

    /**
     * An event emitted when the text inside this editor gained focus (i.e. cursor blinking).
     * @event
     */
    onDidFocusEditorText(listener: () => void): IDisposable;

    /**
     * An event emitted when the text inside this editor lost focus.
     * @event
     */
    onDidBlurEditorText(listener: () => void): IDisposable;

    /**
     * An event emitted when the text inside this editor or an editor widget gained focus.
     * @event
     */
    onDidFocusEditor(listener: () => void): IDisposable;

    /**
     * An event emitted when the text inside this editor or an editor widget lost focus.
     * @event
     */
    onDidBlurEditor(listener: () => void): IDisposable;

    /**
     * Saves current view state of the editor in a serializable object.
     */
    saveViewState(): ICodeEditorViewState;

    /**
     * Restores the view state of the editor from a serializable object generated by `saveViewState`.
     */
    restoreViewState(state: ICodeEditorViewState): void;

    /**
     * Returns true if this editor or one of its widgets has keyboard focus.
     */
    hasWidgetFocus(): boolean;

    /**
     * Get a contribution of this editor.
     * @id Unique identifier of the contribution.
     * @return The contribution or null if contribution not found.
     */
    getContribution<T extends IEditorContribution>(id: string): T;

    /**
     * Type the getModel() of IEditor.
     */
    getModel(): IModel;

    /**
     * Returns the current editor's configuration
     */
    getConfiguration(): InternalEditorOptions;

    /**
     * Get value of the current model attached to this editor.
     * @see IModel.getValue
     */
    getValue(options?: {
        preserveBOM: boolean;
        lineEnding: string;
    }): string;

    /**
     * Set the value of the current model attached to this editor.
     * @see IModel.setValue
     */
    setValue(newValue: string): void;

    /**
     * Get the scrollWidth of the editor's viewport.
     */
    getScrollWidth(): number;

    /**
     * Get the scrollLeft of the editor's viewport.
     */
    getScrollLeft(): number;

    /**
     * Get the scrollHeight of the editor's viewport.
     */
    getScrollHeight(): number;

    /**
     * Get the scrollTop of the editor's viewport.
     */
    getScrollTop(): number;

    /**
     * Change the scrollLeft of the editor's viewport.
     */
    setScrollLeft(newScrollLeft: number): void;

    /**
     * Change the scrollTop of the editor's viewport.
     */
    setScrollTop(newScrollTop: number): void;

    /**
     * Change the scroll position of the editor's viewport.
     */
    setScrollPosition(position: INewScrollPosition): void;

    /**
     * Get an action that is a contribution to this editor.
     * @id Unique identifier of the contribution.
     * @return The action or null if action not found.
     */
    getAction(id: string): IEditorAction;

    /**
     * Execute a command on the editor.
     * The edits will land on the undo-redo stack, but no "undo stop" will be pushed.
     * @param source The source of the call.
     * @param command The command to execute
     */
    executeCommand(source: string, command: ICommand): void;

    /**
     * Push an "undo stop" in the undo-redo stack.
     */
    pushUndoStop(): boolean;

    /**
     * Execute edits on the editor.
     * The edits will land on the undo-redo stack, but no "undo stop" will be pushed.
     * @param source The source of the call.
     * @param edits The edits to execute.
     * @param endCursoState Cursor state after the edits were applied.
     */
    executeEdits(source: string, edits: IIdentifiedSingleEditOperation[], endCursoState?: Selection[]): boolean;

    /**
     * Execute multiple (concommitent) commands on the editor.
     * @param source The source of the call.
     * @param command The commands to execute
     */
    executeCommands(source: string, commands: ICommand[]): void;

    /**
     * Get all the decorations on a line (filtering out decorations from other editors).
     */
    getLineDecorations(lineNumber: number): IModelDecoration[];

    /**
     * All decorations added through this call will get the ownerId of this editor.
     * @see IModel.deltaDecorations
     */
    deltaDecorations(oldDecorations: string[], newDecorations: IModelDeltaDecoration[]): string[];

    /**
     * Get the layout info for the editor.
     */
    getLayoutInfo(): EditorLayoutInfo;
}

export interface ICommonDiffEditor extends IEditor {
    /**
     * An event emitted when the diff information computed by this diff editor has been updated.
     * @event
     */
    onDidUpdateDiff(listener: () => void): IDisposable;

    /**
     * Saves current view state of the editor in a serializable object.
     */
    saveViewState(): IDiffEditorViewState;

    /**
     * Restores the view state of the editor from a serializable object generated by `saveViewState`.
     */
    restoreViewState(state: IDiffEditorViewState): void;

    /**
     * Type the getModel() of IEditor.
     */
    getModel(): IDiffEditorModel;

    /**
     * Get the `original` editor.
     */
    getOriginalEditor(): ICommonCodeEditor;

    /**
     * Get the `modified` editor.
     */
    getModifiedEditor(): ICommonCodeEditor;

    /**
     * Get the computed diff information.
     */
    getLineChanges(): ILineChange[];

    /**
     * Get information based on computed diff about a line number from the original model.
     * If the diff computation is not finished or the model is missing, will return null.
     */
    getDiffLineInformationForOriginal(lineNumber: number): IDiffLineInformation;

    /**
     * Get information based on computed diff about a line number from the modified model.
     * If the diff computation is not finished or the model is missing, will return null.
     */
    getDiffLineInformationForModified(lineNumber: number): IDiffLineInformation;

    /**
     * @see ICodeEditor.getValue
     */
    getValue(options?: {
        preserveBOM: boolean;
        lineEnding: string;
    }): string;
}

/**
 * The type of the `IEditor`.
 */
export let EditorType: {
    ICodeEditor: string;
    IDiffEditor: string;
};

/**
 * An event describing that the current mode associated with a model has changed.
 */
export interface IModelLanguageChangedEvent {
    /**
     * Previous language
     */
    readonly oldLanguage: string;
    /**
     * New language
     */
    readonly newLanguage: string;
}

export interface IModelContentChange {
    /**
     * The range that got replaced.
     */
    readonly range: IRange;
    /**
     * The length of the range that got replaced.
     */
    readonly rangeLength: number;
    /**
     * The new text for the range.
     */
    readonly text: string;
}

/**
 * An event describing a change in the text of a model.
 */
export interface IModelContentChangedEvent {
    readonly changes: IModelContentChange[];
    /**
     * The (new) end-of-line character.
     */
    readonly eol: string;
    /**
     * The new version id the model has transitioned to.
     */
    readonly versionId: number;
    /**
     * Flag that indicates that this event was generated while undoing.
     */
    readonly isUndoing: boolean;
    /**
     * Flag that indicates that this event was generated while redoing.
     */
    readonly isRedoing: boolean;
    /**
     * Flag that indicates that all decorations were lost with this edit.
     * The model has been reset to a new value.
     */
    readonly isFlush: boolean;
}

/**
 * An event describing that model decorations have changed.
 */
export interface IModelDecorationsChangedEvent {
    /**
     * Lists of ids for added decorations.
     */
    readonly addedDecorations: string[];
    /**
     * Lists of ids for changed decorations.
     */
    readonly changedDecorations: string[];
    /**
     * List of ids for removed decorations.
     */
    readonly removedDecorations: string[];
}

/**
 * An event describing that some ranges of lines have been tokenized (their tokens have changed).
 */
export interface IModelTokensChangedEvent {
    readonly ranges: {
        /**
         * The start of the range (inclusive)
         */
        readonly fromLineNumber: number;
        /**
         * The end of the range (inclusive)
         */
        readonly toLineNumber: number;
    }[];
}

export interface IModelOptionsChangedEvent {
    readonly tabSize: boolean;
    readonly insertSpaces: boolean;
    readonly trimAutoWhitespace: boolean;
}

/**
 * Describes the reason the cursor has changed its position.
 */
export enum CursorChangeReason {
    /**
     * Unknown or not set.
     */
    NotSet = 0,
    /**
     * A `model.setValue()` was called.
     */
    ContentFlush = 1,
    /**
     * The `model` has been changed outside of this cursor and the cursor recovers its position from associated markers.
     */
    RecoverFromMarkers = 2,
    /**
     * There was an explicit user gesture.
     */
    Explicit = 3,
    /**
     * There was a Paste.
     */
    Paste = 4,
    /**
     * There was an Undo.
     */
    Undo = 5,
    /**
     * There was a Redo.
     */
    Redo = 6,
}

/**
 * An event describing that the cursor position has changed.
 */
export interface ICursorPositionChangedEvent {
    /**
     * Primary cursor's position.
     */
    readonly position: Position;
    /**
     * Secondary cursors' position.
     */
    readonly secondaryPositions: Position[];
    /**
     * Reason.
     */
    readonly reason: CursorChangeReason;
    /**
     * Source of the call that caused the event.
     */
    readonly source: string;
}

/**
 * An event describing that the cursor selection has changed.
 */
export interface ICursorSelectionChangedEvent {
    /**
     * The primary selection.
     */
    readonly selection: Selection;
    /**
     * The secondary selections.
     */
    readonly secondarySelections: Selection[];
    /**
     * Source of the call that caused the event.
     */
    readonly source: string;
    /**
     * Reason.
     */
    readonly reason: CursorChangeReason;
}

/**
 * Configuration options for editor scrollbars
 */
export interface IEditorScrollbarOptions {
    /**
     * The size of arrows (if displayed).
     * Defaults to 11.
     */
    arrowSize?: number;
    /**
     * Render vertical scrollbar.
     * Accepted values: 'auto', 'visible', 'hidden'.
     * Defaults to 'auto'.
     */
    vertical?: string;
    /**
     * Render horizontal scrollbar.
     * Accepted values: 'auto', 'visible', 'hidden'.
     * Defaults to 'auto'.
     */
    horizontal?: string;
    /**
     * Cast horizontal and vertical shadows when the content is scrolled.
     * Defaults to true.
     */
    useShadows?: boolean;
    /**
     * Render arrows at the top and bottom of the vertical scrollbar.
     * Defaults to false.
     */
    verticalHasArrows?: boolean;
    /**
     * Render arrows at the left and right of the horizontal scrollbar.
     * Defaults to false.
     */
    horizontalHasArrows?: boolean;
    /**
     * Listen to mouse wheel events and react to them by scrolling.
     * Defaults to true.
     */
    handleMouseWheel?: boolean;
    /**
     * Height in pixels for the horizontal scrollbar.
     * Defaults to 10 (px).
     */
    horizontalScrollbarSize?: number;
    /**
     * Width in pixels for the vertical scrollbar.
     * Defaults to 10 (px).
     */
    verticalScrollbarSize?: number;
    /**
     * Width in pixels for the vertical slider.
     * Defaults to `verticalScrollbarSize`.
     */
    verticalSliderSize?: number;
    /**
     * Height in pixels for the horizontal slider.
     * Defaults to `horizontalScrollbarSize`.
     */
    horizontalSliderSize?: number;
}

/**
 * Configuration options for editor find widget
 */
export interface IEditorFindOptions {
    /**
     * Controls if we seed search string in the Find Widget with editor selection.
     */
    seedSearchStringFromSelection?: boolean;
    /**
     * Controls if Find in Selection flag is turned on when multiple lines of text are selected in the editor.
     */
    autoFindInSelection: boolean;
}

/**
 * Configuration options for editor minimap
 */
export interface IEditorMinimapOptions {
    /**
     * Enable the rendering of the minimap.
     * Defaults to false.
     */
    enabled?: boolean;
    /**
     * Control the rendering of the minimap slider.
     * Defaults to 'mouseover'.
     */
    showSlider?: 'always' | 'mouseover';
    /**
     * Render the actual text on a line (as opposed to color blocks).
     * Defaults to true.
     */
    renderCharacters?: boolean;
    /**
     * Limit the width of the minimap to render at most a certain number of columns.
     * Defaults to 120.
     */
    maxColumn?: number;
}

/**
 * Configuration options for the editor.
 */
export interface IEditorOptions {
    /**
     * The aria label for the editor's textarea (when it is focused).
     */
    ariaLabel?: string;
    /**
     * Render vertical lines at the specified columns.
     * Defaults to empty array.
     */
    rulers?: number[];
    /**
     * A string containing the word separators used when doing word navigation.
     * Defaults to `~!@#$%^&*()-=+[{]}\\|;:\'",.<>/?
     */
    wordSeparators?: string;
    /**
     * Enable Linux primary clipboard.
     * Defaults to true.
     */
    selectionClipboard?: boolean;
    /**
     * Control the rendering of line numbers.
     * If it is a function, it will be invoked when rendering a line number and the return value will be rendered.
     * Otherwise, if it is a truey, line numbers will be rendered normally (equivalent of using an identity function).
     * Otherwise, line numbers will not be rendered.
     * Defaults to true.
     */
    lineNumbers?: 'on' | 'off' | 'relative' | ((lineNumber: number) => string);
    /**
     * Should the corresponding line be selected when clicking on the line number?
     * Defaults to true.
     */
    selectOnLineNumbers?: boolean;
    /**
     * Control the width of line numbers, by reserving horizontal space for rendering at least an amount of digits.
     * Defaults to 5.
     */
    lineNumbersMinChars?: number;
    /**
     * Enable the rendering of the glyph margin.
     * Defaults to true in vscode and to false in monaco-editor.
     */
    glyphMargin?: boolean;
    /**
     * The width reserved for line decorations (in px).
     * Line decorations are placed between line numbers and the editor content.
     * You can pass in a string in the format floating point followed by "ch". e.g. 1.3ch.
     * Defaults to 10.
     */
    lineDecorationsWidth?: number | string;
    /**
     * When revealing the cursor, a virtual padding (px) is added to the cursor, turning it into a rectangle.
     * This virtual padding ensures that the cursor gets revealed before hitting the edge of the viewport.
     * Defaults to 30 (px).
     */
    revealHorizontalRightPadding?: number;
    /**
     * Render the editor selection with rounded borders.
     * Defaults to true.
     */
    roundedSelection?: boolean;
    /**
     * Class name to be added to the editor.
     */
    extraEditorClassName?: string;
    /**
     * Should the editor be read only.
     * Defaults to false.
     */
    readOnly?: boolean;
    /**
     * Control the behavior and rendering of the scrollbars.
     */
    scrollbar?: IEditorScrollbarOptions;
    /**
     * Control the behavior and rendering of the minimap.
     */
    minimap?: IEditorMinimapOptions;
    /**
     * Control the behavior of the find widget.
     */
    find?: IEditorFindOptions;
    /**
     * Display overflow widgets as `fixed`.
     * Defaults to `false`.
     */
    fixedOverflowWidgets?: boolean;
    /**
     * The number of vertical lanes the overview ruler should render.
     * Defaults to 2.
     */
    overviewRulerLanes?: number;
    /**
     * Controls if a border should be drawn around the overview ruler.
     * Defaults to `true`.
     */
    overviewRulerBorder?: boolean;
    /**
     * Control the cursor animation style, possible values are 'blink', 'smooth', 'phase', 'expand' and 'solid'.
     * Defaults to 'blink'.
     */
    cursorBlinking?: string;
    /**
     * Zoom the font in the editor when using the mouse wheel in combination with holding Ctrl.
     * Defaults to false.
     */
    mouseWheelZoom?: boolean;
    /**
     * Control the cursor style, either 'block' or 'line'.
     * Defaults to 'line'.
     */
    cursorStyle?: string;
    /**
     * Enable font ligatures.
     * Defaults to false.
     */
    fontLigatures?: boolean;
    /**
     * Disable the use of `will-change` for the editor margin and lines layers.
     * The usage of `will-change` acts as a hint for browsers to create an extra layer.
     * Defaults to false.
     */
    disableLayerHinting?: boolean;
    /**
     * Disable the optimizations for monospace fonts.
     * Defaults to false.
     */
    disableMonospaceOptimizations?: boolean;
    /**
     * Should the cursor be hidden in the overview ruler.
     * Defaults to false.
     */
    hideCursorInOverviewRuler?: boolean;
    /**
     * Enable that scrolling can go one screen size after the last line.
     * Defaults to true.
     */
    scrollBeyondLastLine?: boolean;
    /**
     * Enable that the editor will install an interval to check if its container dom node size has changed.
     * Enabling this might have a severe performance impact.
     * Defaults to false.
     */
    automaticLayout?: boolean;
    /**
     * Control the wrapping of the editor.
     * When `wordWrap` = "off", the lines will never wrap.
     * When `wordWrap` = "on", the lines will wrap at the viewport width.
     * When `wordWrap` = "wordWrapColumn", the lines will wrap at `wordWrapColumn`.
     * When `wordWrap` = "bounded", the lines will wrap at min(viewport width, wordWrapColumn).
     * Defaults to "off".
     */
    wordWrap?: 'off' | 'on' | 'wordWrapColumn' | 'bounded';
    /**
     * Control the wrapping of the editor.
     * When `wordWrap` = "off", the lines will never wrap.
     * When `wordWrap` = "on", the lines will wrap at the viewport width.
     * When `wordWrap` = "wordWrapColumn", the lines will wrap at `wordWrapColumn`.
     * When `wordWrap` = "bounded", the lines will wrap at min(viewport width, wordWrapColumn).
     * Defaults to 80.
     */
    wordWrapColumn?: number;
    /**
     * Force word wrapping when the text appears to be of a minified/generated file.
     * Defaults to true.
     */
    wordWrapMinified?: boolean;
    /**
     * Control indentation of wrapped lines. Can be: 'none', 'same' or 'indent'.
     * Defaults to 'same' in vscode and to 'none' in monaco-editor.
     */
    wrappingIndent?: string;
    /**
     * Configure word wrapping characters. A break will be introduced before these characters.
     * Defaults to '{([+'.
         */
    wordWrapBreakBeforeCharacters?: string;
    /**
     * Configure word wrapping characters. A break will be introduced after these characters.
     * Defaults to ' \t})]?|&,;'.
     */
    wordWrapBreakAfterCharacters?: string;
    /**
     * Configure word wrapping characters. A break will be introduced after these characters only if no `wordWrapBreakBeforeCharacters` or `wordWrapBreakAfterCharacters` were found.
     * Defaults to '.'.
     */
    wordWrapBreakObtrusiveCharacters?: string;
    /**
     * Performance guard: Stop rendering a line after x characters.
     * Defaults to 10000.
     * Use -1 to never stop rendering
     */
    stopRenderingLineAfter?: number;
    /**
     * Enable hover.
     * Defaults to true.
     */
    hover?: boolean;
    /**
     * Enable detecting links and making them clickable.
     * Defaults to true.
     */
    links?: boolean;
    /**
     * Enable custom contextmenu.
     * Defaults to true.
     */
    contextmenu?: boolean;
    /**
     * A multiplier to be used on the `deltaX` and `deltaY` of mouse wheel scroll events.
     * Defaults to 1.
     */
    mouseWheelScrollSensitivity?: number;
    /**
     * The modifier to be used to add multiple cursors with the mouse.
     * Defaults to 'alt'
     */
    multiCursorModifier?: 'ctrlCmd' | 'alt';
    /**
     * Configure the editor's accessibility support.
     * Defaults to 'auto'. It is best to leave this to 'auto'.
     */
    accessibilitySupport?: 'auto' | 'off' | 'on';
    /**
     * Enable quick suggestions (shadow suggestions)
     * Defaults to true.
     */
    quickSuggestions?: boolean | {
        other: boolean;
        comments: boolean;
        strings: boolean;
    };
    /**
     * Quick suggestions show delay (in ms)
     * Defaults to 500 (ms)
     */
    quickSuggestionsDelay?: number;
    /**
     * Enables parameter hints
     */
    parameterHints?: boolean;
    /**
     * Render icons in suggestions box.
     * Defaults to true.
     */
    iconsInSuggestions?: boolean;
    /**
     * Enable auto closing brackets.
     * Defaults to true.
     */
    autoClosingBrackets?: boolean;
    /**
     * Enable auto indentation adjustment.
     * Defaults to false.
     */
    autoIndent?: boolean;
    /**
     * Enable format on type.
     * Defaults to false.
     */
    formatOnType?: boolean;
    /**
     * Enable format on paste.
     * Defaults to false.
     */
    formatOnPaste?: boolean;
    /**
     * Controls if the editor should allow to move selections via drag and drop.
     * Defaults to false.
     */
    dragAndDrop?: boolean;
    /**
     * Enable the suggestion box to pop-up on trigger characters.
     * Defaults to true.
     */
    suggestOnTriggerCharacters?: boolean;
    /**
     * Accept suggestions on ENTER.
     * Defaults to 'on'.
     */
    acceptSuggestionOnEnter?: 'on' | 'smart' | 'off';
    /**
     * Accept suggestions on provider defined characters.
     * Defaults to true.
     */
    acceptSuggestionOnCommitCharacter?: boolean;
    /**
     * Enable snippet suggestions. Default to 'true'.
     */
    snippetSuggestions?: 'top' | 'bottom' | 'inline' | 'none';
    /**
     * Copying without a selection copies the current line.
     */
    emptySelectionClipboard?: boolean;
    /**
     * Enable word based suggestions. Defaults to 'true'
     */
    wordBasedSuggestions?: boolean;
    /**
     * The font size for the suggest widget.
     * Defaults to the editor font size.
     */
    suggestFontSize?: number;
    /**
     * The line height for the suggest widget.
     * Defaults to the editor line height.
     */
    suggestLineHeight?: number;
    /**
     * Enable selection highlight.
     * Defaults to true.
     */
    selectionHighlight?: boolean;
    /**
     * Enable semantic occurrences highlight.
     * Defaults to true.
     */
    occurrencesHighlight?: boolean;
    /**
     * Show code lens
     * Defaults to true.
     */
    codeLens?: boolean;
    /**
     * Enable code folding
     * Defaults to true in vscode and to false in monaco-editor.
     */
    folding?: boolean;
    /**
     * Controls whether the fold actions in the gutter stay always visible or hide unless the mouse is over the gutter.
     * Defaults to 'mouseover'.
     */
    showFoldingControls?: 'always' | 'mouseover';
    /**
     * Enable highlighting of matching brackets.
     * Defaults to true.
     */
    matchBrackets?: boolean;
    /**
     * Enable rendering of whitespace.
     * Defaults to none.
     */
    renderWhitespace?: 'none' | 'boundary' | 'all';
    /**
     * Enable rendering of control characters.
     * Defaults to false.
     */
    renderControlCharacters?: boolean;
    /**
     * Enable rendering of indent guides.
     * Defaults to false.
     */
    renderIndentGuides?: boolean;
    /**
     * Enable rendering of current line highlight.
     * Defaults to all.
     */
    renderLineHighlight?: 'none' | 'gutter' | 'line' | 'all';
    /**
     * Inserting and deleting whitespace follows tab stops.
     */
    useTabStops?: boolean;
    /**
     * The font family
     */
    fontFamily?: string;
    /**
     * The font weight
     */
    fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | 'initial' | 'inherit' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    /**
     * The font size
     */
    fontSize?: number;
    /**
     * The line height
     */
    lineHeight?: number;
    /**
     * The letter spacing
     */
    letterSpacing?: number;
}

/**
 * Configuration options for the diff editor.
 */
export interface IDiffEditorOptions extends IEditorOptions {
    /**
     * Allow the user to resize the diff editor split view.
     * Defaults to true.
     */
    enableSplitViewResizing?: boolean;
    /**
     * Render the differences in two side-by-side editors.
     * Defaults to true.
     */
    renderSideBySide?: boolean;
    /**
     * Compute the diff by ignoring leading/trailing whitespace
     * Defaults to true.
     */
    ignoreTrimWhitespace?: boolean;
    /**
     * Render +/- indicators for added/deleted changes.
     * Defaults to true.
     */
    renderIndicators?: boolean;
    /**
     * Original model should be editable?
     * Defaults to false.
     */
    originalEditable?: boolean;
}

export enum RenderMinimap {
    None = 0,
    Small = 1,
    Large = 2,
    SmallBlocks = 3,
    LargeBlocks = 4,
}

/**
 * Describes how to indent wrapped lines.
 */
export enum WrappingIndent {
    /**
     * No indentation => wrapped lines begin at column 1.
     */
    None = 0,
    /**
     * Same => wrapped lines get the same indentation as the parent.
     */
    Same = 1,
    /**
     * Indent => wrapped lines get +1 indentation as the parent.
     */
    Indent = 2,
}

/**
 * The kind of animation in which the editor's cursor should be rendered.
 */
export enum TextEditorCursorBlinkingStyle {
    /**
     * Hidden
     */
    Hidden = 0,
    /**
     * Blinking
     */
    Blink = 1,
    /**
     * Blinking with smooth fading
     */
    Smooth = 2,
    /**
     * Blinking with prolonged filled state and smooth fading
     */
    Phase = 3,
    /**
     * Expand collapse animation on the y axis
     */
    Expand = 4,
    /**
     * No-Blinking
     */
    Solid = 5,
}

/**
 * The style in which the editor's cursor should be rendered.
 */
export enum TextEditorCursorStyle {
    /**
     * As a vertical line (sitting between two characters).
     */
    Line = 1,
    /**
     * As a block (sitting on top of a character).
     */
    Block = 2,
    /**
     * As a horizontal line (sitting under a character).
     */
    Underline = 3,
    /**
     * As a thin vertical line (sitting between two characters).
     */
    LineThin = 4,
    /**
     * As an outlined block (sitting on top of a character).
     */
    BlockOutline = 5,
    /**
     * As a thin horizontal line (sitting under a character).
     */
    UnderlineThin = 6,
}

export interface InternalEditorScrollbarOptions {
    readonly arrowSize: number;
    readonly vertical: ScrollbarVisibility;
    readonly horizontal: ScrollbarVisibility;
    readonly useShadows: boolean;
    readonly verticalHasArrows: boolean;
    readonly horizontalHasArrows: boolean;
    readonly handleMouseWheel: boolean;
    readonly horizontalScrollbarSize: number;
    readonly horizontalSliderSize: number;
    readonly verticalScrollbarSize: number;
    readonly verticalSliderSize: number;
    readonly mouseWheelScrollSensitivity: number;
}

export interface InternalEditorMinimapOptions {
    readonly enabled: boolean;
    readonly showSlider: 'always' | 'mouseover';
    readonly renderCharacters: boolean;
    readonly maxColumn: number;
}

export interface InternalEditorFindOptions {
    readonly seedSearchStringFromSelection: boolean;
    readonly autoFindInSelection: boolean;
}

export interface EditorWrappingInfo {
    readonly inDiffEditor: boolean;
    readonly isDominatedByLongLines: boolean;
    readonly isWordWrapMinified: boolean;
    readonly isViewportWrapping: boolean;
    readonly wrappingColumn: number;
    readonly wrappingIndent: WrappingIndent;
    readonly wordWrapBreakBeforeCharacters: string;
    readonly wordWrapBreakAfterCharacters: string;
    readonly wordWrapBreakObtrusiveCharacters: string;
}

export interface InternalEditorViewOptions {
    readonly extraEditorClassName: string;
    readonly disableMonospaceOptimizations: boolean;
    readonly rulers: number[];
    readonly ariaLabel: string;
    readonly renderLineNumbers: boolean;
    readonly renderCustomLineNumbers: (lineNumber: number) => string;
    readonly renderRelativeLineNumbers: boolean;
    readonly selectOnLineNumbers: boolean;
    readonly glyphMargin: boolean;
    readonly revealHorizontalRightPadding: number;
    readonly roundedSelection: boolean;
    readonly overviewRulerLanes: number;
    readonly overviewRulerBorder: boolean;
    readonly cursorBlinking: TextEditorCursorBlinkingStyle;
    readonly mouseWheelZoom: boolean;
    readonly cursorStyle: TextEditorCursorStyle;
    readonly hideCursorInOverviewRuler: boolean;
    readonly scrollBeyondLastLine: boolean;
    readonly stopRenderingLineAfter: number;
    readonly renderWhitespace: 'none' | 'boundary' | 'all';
    readonly renderControlCharacters: boolean;
    readonly fontLigatures: boolean;
    readonly renderIndentGuides: boolean;
    readonly renderLineHighlight: 'none' | 'gutter' | 'line' | 'all';
    readonly scrollbar: InternalEditorScrollbarOptions;
    readonly minimap: InternalEditorMinimapOptions;
    readonly fixedOverflowWidgets: boolean;
}

export interface EditorContribOptions {
    readonly selectionClipboard: boolean;
    readonly hover: boolean;
    readonly links: boolean;
    readonly contextmenu: boolean;
    readonly quickSuggestions: boolean | {
        other: boolean;
        comments: boolean;
        strings: boolean;
    };
    readonly quickSuggestionsDelay: number;
    readonly parameterHints: boolean;
    readonly iconsInSuggestions: boolean;
    readonly formatOnType: boolean;
    readonly formatOnPaste: boolean;
    readonly suggestOnTriggerCharacters: boolean;
    readonly acceptSuggestionOnEnter: 'on' | 'smart' | 'off';
    readonly acceptSuggestionOnCommitCharacter: boolean;
    readonly snippetSuggestions: 'top' | 'bottom' | 'inline' | 'none';
    readonly wordBasedSuggestions: boolean;
    readonly suggestFontSize: number;
    readonly suggestLineHeight: number;
    readonly selectionHighlight: boolean;
    readonly occurrencesHighlight: boolean;
    readonly codeLens: boolean;
    readonly folding: boolean;
    readonly showFoldingControls: 'always' | 'mouseover';
    readonly matchBrackets: boolean;
    readonly find: InternalEditorFindOptions;
}

/**
 * Internal configuration options (transformed or computed) for the editor.
 */
export class InternalEditorOptions {
    readonly _internalEditorOptionsBrand: void;
    readonly canUseLayerHinting: boolean;
    readonly pixelRatio: number;
    readonly editorClassName: string;
    readonly lineHeight: number;
    readonly readOnly: boolean;
    readonly multiCursorModifier: 'altKey' | 'ctrlKey' | 'metaKey';
    readonly wordSeparators: string;
    readonly autoClosingBrackets: boolean;
    readonly autoIndent: boolean;
    readonly useTabStops: boolean;
    readonly tabFocusMode: boolean;
    readonly dragAndDrop: boolean;
    readonly emptySelectionClipboard: boolean;
    readonly layoutInfo: EditorLayoutInfo;
    readonly fontInfo: FontInfo;
    readonly viewInfo: InternalEditorViewOptions;
    readonly wrappingInfo: EditorWrappingInfo;
    readonly contribInfo: EditorContribOptions;
}

/**
 * A description for the overview ruler position.
 */
export interface OverviewRulerPosition {
    /**
     * Width of the overview ruler
     */
    readonly width: number;
    /**
     * Height of the overview ruler
     */
    readonly height: number;
    /**
     * Top position for the overview ruler
     */
    readonly top: number;
    /**
     * Right position for the overview ruler
     */
    readonly right: number;
}

/**
 * The internal layout details of the editor.
 */
export interface EditorLayoutInfo {
    /**
     * Full editor width.
     */
    readonly width: number;
    /**
     * Full editor height.
     */
    readonly height: number;
    /**
     * Left position for the glyph margin.
     */
    readonly glyphMarginLeft: number;
    /**
     * The width of the glyph margin.
     */
    readonly glyphMarginWidth: number;
    /**
     * The height of the glyph margin.
     */
    readonly glyphMarginHeight: number;
    /**
     * Left position for the line numbers.
     */
    readonly lineNumbersLeft: number;
    /**
     * The width of the line numbers.
     */
    readonly lineNumbersWidth: number;
    /**
     * The height of the line numbers.
     */
    readonly lineNumbersHeight: number;
    /**
     * Left position for the line decorations.
     */
    readonly decorationsLeft: number;
    /**
     * The width of the line decorations.
     */
    readonly decorationsWidth: number;
    /**
     * The height of the line decorations.
     */
    readonly decorationsHeight: number;
    /**
     * Left position for the content (actual text)
     */
    readonly contentLeft: number;
    /**
     * The width of the content (actual text)
     */
    readonly contentWidth: number;
    /**
     * The height of the content (actual height)
     */
    readonly contentHeight: number;
    /**
     * The width of the minimap
     */
    readonly minimapWidth: number;
    /**
     * Minimap render type
     */
    readonly renderMinimap: RenderMinimap;
    /**
     * The number of columns (of typical characters) fitting on a viewport line.
     */
    readonly viewportColumn: number;
    /**
     * The width of the vertical scrollbar.
     */
    readonly verticalScrollbarWidth: number;
    /**
     * The height of the horizontal scrollbar.
     */
    readonly horizontalScrollbarHeight: number;
    /**
     * The position of the overview ruler.
     */
    readonly overviewRuler: OverviewRulerPosition;
}

/**
 * An event describing that the configuration of the editor has changed.
 */
export interface IConfigurationChangedEvent {
    readonly canUseLayerHinting: boolean;
    readonly pixelRatio: boolean;
    readonly editorClassName: boolean;
    readonly lineHeight: boolean;
    readonly readOnly: boolean;
    readonly accessibilitySupport: boolean;
    readonly multiCursorModifier: boolean;
    readonly wordSeparators: boolean;
    readonly autoClosingBrackets: boolean;
    readonly autoIndent: boolean;
    readonly useTabStops: boolean;
    readonly tabFocusMode: boolean;
    readonly dragAndDrop: boolean;
    readonly emptySelectionClipboard: boolean;
    readonly layoutInfo: boolean;
    readonly fontInfo: boolean;
    readonly viewInfo: boolean;
    readonly wrappingInfo: boolean;
    readonly contribInfo: boolean;
}

/**
 * A view zone is a full horizontal rectangle that 'pushes' text down.
 * The editor reserves space for view zones when rendering.
 */
export interface IViewZone {
    /**
     * The line number after which this zone should appear.
     * Use 0 to place a view zone before the first line number.
     */
    afterLineNumber: number;
    /**
     * The column after which this zone should appear.
     * If not set, the maxLineColumn of `afterLineNumber` will be used.
     */
    afterColumn?: number;
    /**
     * Suppress mouse down events.
     * If set, the editor will attach a mouse down listener to the view zone and .preventDefault on it.
     * Defaults to false
     */
    suppressMouseDown?: boolean;
    /**
     * The height in lines of the view zone.
     * If specified, `heightInPx` will be used instead of this.
     * If neither `heightInPx` nor `heightInLines` is specified, a default of `heightInLines` = 1 will be chosen.
     */
    heightInLines?: number;
    /**
     * The height in px of the view zone.
     * If this is set, the editor will give preference to it rather than `heightInLines` above.
     * If neither `heightInPx` nor `heightInLines` is specified, a default of `heightInLines` = 1 will be chosen.
     */
    heightInPx?: number;
    /**
     * The dom node of the view zone
     */
    domNode: HTMLElement;
    /**
     * An optional dom node for the view zone that will be placed in the margin area.
     */
    marginDomNode?: HTMLElement;
    /**
     * Callback which gives the relative top of the view zone as it appears (taking scrolling into account).
     */
    onDomNodeTop?: (top: number) => void;
    /**
     * Callback which gives the height in pixels of the view zone.
     */
    onComputedHeight?: (height: number) => void;
}

/**
 * An accessor that allows for zones to be added or removed.
 */
export interface IViewZoneChangeAccessor {
    /**
     * Create a new view zone.
     * @param zone Zone to create
     * @return A unique identifier to the view zone.
     */
    addZone(zone: IViewZone): number;

    /**
     * Remove a zone
     * @param id A unique identifier to the view zone, as returned by the `addZone` call.
     */
    removeZone(id: number): void;

    /**
     * Change a zone's position.
     * The editor will rescan the `afterLineNumber` and `afterColumn` properties of a view zone.
     */
    layoutZone(id: number): void;
}

/**
 * A positioning preference for rendering content widgets.
 */
export enum ContentWidgetPositionPreference {
    /**
     * Place the content widget exactly at a position
     */
    EXACT = 0,
    /**
     * Place the content widget above a position
     */
    ABOVE = 1,
    /**
     * Place the content widget below a position
     */
    BELOW = 2,
}

/**
 * A position for rendering content widgets.
 */
export interface IContentWidgetPosition {
    /**
     * Desired position for the content widget.
     * `preference` will also affect the placement.
     */
    position: IPosition;
    /**
     * Placement preference for position, in order of preference.
     */
    preference: ContentWidgetPositionPreference[];
}

/**
 * A content widget renders inline with the text and can be easily placed 'near' an editor position.
 */
export interface IContentWidget {
    /**
     * Render this content widget in a location where it could overflow the editor's view dom node.
     */
    allowEditorOverflow?: boolean;
    suppressMouseDown?: boolean;

    /**
     * Get a unique identifier of the content widget.
     */
    getId(): string;

    /**
     * Get the dom node of the content widget.
     */
    getDomNode(): HTMLElement;

    /**
     * Get the placement of the content widget.
     * If null is returned, the content widget will be placed off screen.
     */
    getPosition(): IContentWidgetPosition;
}

/**
 * A positioning preference for rendering overlay widgets.
 */
export enum OverlayWidgetPositionPreference {
    /**
     * Position the overlay widget in the top right corner
     */
    TOP_RIGHT_CORNER = 0,
    /**
     * Position the overlay widget in the bottom right corner
     */
    BOTTOM_RIGHT_CORNER = 1,
    /**
     * Position the overlay widget in the top center
     */
    TOP_CENTER = 2,
}

/**
 * A position for rendering overlay widgets.
 */
export interface IOverlayWidgetPosition {
    /**
     * The position preference for the overlay widget.
     */
    preference: OverlayWidgetPositionPreference;
}

/**
 * An overlay widgets renders on top of the text.
 */
export interface IOverlayWidget {
    /**
     * Get a unique identifier of the overlay widget.
     */
    getId(): string;

    /**
     * Get the dom node of the overlay widget.
     */
    getDomNode(): HTMLElement;

    /**
     * Get the placement of the overlay widget.
     * If null is returned, the overlay widget is responsible to place itself.
     */
    getPosition(): IOverlayWidgetPosition;
}

/**
 * Type of hit element with the mouse in the editor.
 */
export enum MouseTargetType {
    /**
     * Mouse is on top of an unknown element.
     */
    UNKNOWN = 0,
    /**
     * Mouse is on top of the textarea used for input.
     */
    TEXTAREA = 1,
    /**
     * Mouse is on top of the glyph margin
     */
    GUTTER_GLYPH_MARGIN = 2,
    /**
     * Mouse is on top of the line numbers
     */
    GUTTER_LINE_NUMBERS = 3,
    /**
     * Mouse is on top of the line decorations
     */
    GUTTER_LINE_DECORATIONS = 4,
    /**
     * Mouse is on top of the whitespace left in the gutter by a view zone.
     */
    GUTTER_VIEW_ZONE = 5,
    /**
     * Mouse is on top of text in the content.
     */
    CONTENT_TEXT = 6,
    /**
     * Mouse is on top of empty space in the content (e.g. after line text or below last line)
     */
    CONTENT_EMPTY = 7,
    /**
     * Mouse is on top of a view zone in the content.
     */
    CONTENT_VIEW_ZONE = 8,
    /**
     * Mouse is on top of a content widget.
     */
    CONTENT_WIDGET = 9,
    /**
     * Mouse is on top of the decorations overview ruler.
     */
    OVERVIEW_RULER = 10,
    /**
     * Mouse is on top of a scrollbar.
     */
    SCROLLBAR = 11,
    /**
     * Mouse is on top of an overlay widget.
     */
    OVERLAY_WIDGET = 12,
    /**
     * Mouse is outside of the editor.
     */
    OUTSIDE_EDITOR = 13,
}

/**
 * Target hit with the mouse in the editor.
 */
export interface IMouseTarget {
    /**
     * The target element
     */
    readonly element: Element;
    /**
     * The target type
     */
    readonly type: MouseTargetType;
    /**
     * The 'approximate' editor position
     */
    readonly position: Position;
    /**
     * Desired mouse column (e.g. when position.column gets clamped to text length -- clicking after text on a line).
     */
    readonly mouseColumn: number;
    /**
     * The 'approximate' editor range
     */
    readonly range: Range;
    /**
     * Some extra detail.
     */
    readonly detail: any;
}

/**
 * A mouse event originating from the editor.
 */
export interface IEditorMouseEvent {
    readonly event: IMouseEvent;
    readonly target: IMouseTarget;
}

/**
 * A rich code editor.
 */
export interface ICodeEditor extends ICommonCodeEditor {
    /**
     * An event emitted on a "mouseup".
     * @event
     */
    onMouseUp(listener: (e: IEditorMouseEvent) => void): IDisposable;

    /**
     * An event emitted on a "mousedown".
     * @event
     */
    onMouseDown(listener: (e: IEditorMouseEvent) => void): IDisposable;

    /**
     * An event emitted on a "contextmenu".
     * @event
     */
    onContextMenu(listener: (e: IEditorMouseEvent) => void): IDisposable;

    /**
     * An event emitted on a "mousemove".
     * @event
     */
    onMouseMove(listener: (e: IEditorMouseEvent) => void): IDisposable;

    /**
     * An event emitted on a "mouseleave".
     * @event
     */
    onMouseLeave(listener: (e: IEditorMouseEvent) => void): IDisposable;

    /**
     * An event emitted on a "keyup".
     * @event
     */
    onKeyUp(listener: (e: IKeyboardEvent) => void): IDisposable;

    /**
     * An event emitted on a "keydown".
     * @event
     */
    onKeyDown(listener: (e: IKeyboardEvent) => void): IDisposable;

    /**
     * An event emitted when the layout of the editor has changed.
     * @event
     */
    onDidLayoutChange(listener: (e: EditorLayoutInfo) => void): IDisposable;

    /**
     * An event emitted when the scroll in the editor has changed.
     * @event
     */
    onDidScrollChange(listener: (e: IScrollEvent) => void): IDisposable;

    /**
     * Returns the editor's dom node
     */
    getDomNode(): HTMLElement;

    /**
     * Add a content widget. Widgets must have unique ids, otherwise they will be overwritten.
     */
    addContentWidget(widget: IContentWidget): void;

    /**
     * Layout/Reposition a content widget. This is a ping to the editor to call widget.getPosition()
     * and update appropiately.
     */
    layoutContentWidget(widget: IContentWidget): void;

    /**
     * Remove a content widget.
     */
    removeContentWidget(widget: IContentWidget): void;

    /**
     * Add an overlay widget. Widgets must have unique ids, otherwise they will be overwritten.
     */
    addOverlayWidget(widget: IOverlayWidget): void;

    /**
     * Layout/Reposition an overlay widget. This is a ping to the editor to call widget.getPosition()
     * and update appropiately.
     */
    layoutOverlayWidget(widget: IOverlayWidget): void;

    /**
     * Remove an overlay widget.
     */
    removeOverlayWidget(widget: IOverlayWidget): void;

    /**
     * Change the view zones. View zones are lost when a new model is attached to the editor.
     */
    changeViewZones(callback: (accessor: IViewZoneChangeAccessor) => void): void;

    /**
     * Returns the range that is currently centered in the view port.
     */
    getCenteredRangeInViewport(): Range;

    /**
     * Get the horizontal position (left offset) for the column w.r.t to the beginning of the line.
     * This method works only if the line `lineNumber` is currently rendered (in the editor's viewport).
     * Use this method with caution.
     */
    getOffsetForColumn(lineNumber: number, column: number): number;

    /**
     * Force an editor render now.
     */
    render(): void;

    /**
     * Get the vertical position (top offset) for the line w.r.t. to the first line.
     */
    getTopForLineNumber(lineNumber: number): number;

    /**
     * Get the vertical position (top offset) for the position w.r.t. to the first line.
     */
    getTopForPosition(lineNumber: number, column: number): number;

    /**
     * Get the hit test target at coordinates `clientX` and `clientY`.
     * The coordinates are relative to the top-left of the viewport.
     *
     * @returns Hit test target or null if the coordinates fall outside the editor or the editor has no model.
     */
    getTargetAtClientPoint(clientX: number, clientY: number): IMouseTarget;

    /**
     * Get the visible position for `position`.
     * The result position takes scrolling into account and is relative to the top left corner of the editor.
     * Explanation 1: the results of this method will change for the same `position` if the user scrolls the editor.
     * Explanation 2: the results of this method will not change if the container of the editor gets repositioned.
     * Warning: the results of this method are innacurate for positions that are outside the current editor viewport.
     */
    getScrolledVisiblePosition(position: IPosition): {
        top: number;
        left: number;
        height: number;
    };

    /**
     * Apply the same font settings as the editor to `target`.
     */
    applyFontInfo(target: HTMLElement): void;
}

/**
 * A rich diff editor.
 */
export interface IDiffEditor extends ICommonDiffEditor {
    /**
     * @see ICodeEditor.getDomNode
     */
    getDomNode(): HTMLElement;
}

export class BareFontInfo {
    readonly _bareFontInfoBrand: void;
    readonly zoomLevel: number;
    readonly fontFamily: string;
    readonly fontWeight: string;
    readonly fontSize: number;
    readonly lineHeight: number;
    readonly letterSpacing: number;
}

export class FontInfo extends BareFontInfo {
    readonly _editorStylingBrand: void;
    readonly isTrusted: boolean;
    readonly isMonospace: boolean;
    readonly typicalHalfwidthCharacterWidth: number;
    readonly typicalFullwidthCharacterWidth: number;
    readonly spaceWidth: number;
    readonly maxDigitWidth: number;
}
