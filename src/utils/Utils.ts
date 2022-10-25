import {MediaTypeModel} from '../models/MediaTypeModel';
import {TFile, TFolder} from 'obsidian';


export const pluginName: string = 'obsidian-media-db-plugin';
export const contactEmail: string = 'm.projects.code@gmail.com';
export const mediaDbTag: string = 'mediaDB';
export const mediaDbVersion: string = '0.4.1';
export const debug: boolean = true;

export function wrapAround(value: number, size: number): number {
	if (size <= 0) {
		throw Error('size may not be zero or negative');
	}
	return mod(value, size);
}

/**
 * @deprecated use console.debug instead
 * @param o
 */
export function debugLog(o: any): void {
	if (debug) {
		console.log(o);
	}
}

export function containsOnlyLettersAndUnderscores(str: string): boolean {
	return /^[a-zA-Z_]+$/.test(str);
}

export function replaceIllegalFileNameCharactersInString(string: string): string {
	return string.replace(/[\\,#%&{}/*<>$"@.?]*/g, '').replace(/:+/g, ' -');
}

export function replaceTags(template: string, mediaTypeModel: MediaTypeModel): string {
	const resolvedTemplate = template.replace(new RegExp('{{.*?}}', 'g'), (match: string) => replaceTag(match, mediaTypeModel));

	return resolvedTemplate;
}

function replaceTag(match: string, mediaTypeModel: MediaTypeModel): string {
	let tag = match;
	tag = tag.substring(2);
	tag = tag.substring(0, tag.length - 2);
	tag = tag.trim();

	let parts = tag.split(':');
	if (parts.length === 1) {
		let path = parts[0].split('.');

		let obj = traverseMetaData(path, mediaTypeModel);

		if (obj === undefined) {
			return '{{ INVALID TEMPLATE TAG - object undefined }}';
		}

		return obj;
	} else if (parts.length === 2) {
		let operator = parts[0];

		let path = parts[1].split('.');

		let obj = traverseMetaData(path, mediaTypeModel);

		if (obj === undefined) {
			return '{{ INVALID TEMPLATE TAG - object undefined }}';
		}

		if (operator === 'LIST') {
			if (!Array.isArray(obj)) {
				return '{{ INVALID TEMPLATE TAG - operator LIST is only applicable on an array }}';
			}
			return obj.map((e: any) => `- ${e}`).join('\n');
		} else if (operator === 'ENUM') {
			if (!Array.isArray(obj)) {
				return '{{ INVALID TEMPLATE TAG - operator ENUM is only applicable on an array }}';
			}
			return obj.join(', ');
		}

		return `{{ INVALID TEMPLATE TAG - unknown operator ${operator} }}`;
	}

	return '{{ INVALID TEMPLATE TAG }}';
}

function traverseMetaData(path: Array<string>, mediaTypeModel: MediaTypeModel): any {
	let o: any = mediaTypeModel;

	for (let part of path) {
		if (o !== undefined) {
			o = o[part];
		}
	}

	return o;
}

export function markdownTable(content: string[][]): string {
	let rows = content.length;
	if (rows === 0) {
		return '';
	}

	let columns = content[0].length;
	if (columns === 0) {
		return '';
	}
	for (const row of content) {
		if (row.length !== columns) {
			return '';
		}
	}

	let longestStringInColumns: number[] = [];

	for (let i = 0; i < columns; i++) {
		let longestStringInColumn = 0;
		for (const row of content) {
			if (row[i].length > longestStringInColumn) {
				longestStringInColumn = row[i].length;
			}
		}

		longestStringInColumns.push(longestStringInColumn);
	}

	let table = '';

	for (let i = 0; i < rows; i++) {
		table += '|';
		for (let j = 0; j < columns; j++) {
			let element = content[i][j];
			element += ' '.repeat(longestStringInColumns[j] - element.length);
			table += ' ' + element + ' |';
		}
		table += '\n';
		if (i === 0) {
			table += '|';
			for (let j = 0; j < columns; j++) {
				table += ' ' + '-'.repeat(longestStringInColumns[j]) + ' |';
			}
			table += '\n';
		}
	}

	return table;
}

export function dateToString(date: Date) {
	return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
}

export function timeToString(time: Date) {
	return `${time.getHours()}-${time.getMinutes()}-${time.getSeconds()}`;
}

export function dateTimeToString(dateTime: Date) {
	return `${dateToString(dateTime)} ${timeToString(dateTime)}`;
}

/**
 * @deprecated
 */
export class UserCancelError extends Error {
	constructor(message: string) {
		super(message);
	}
}

/**
 * @deprecated
 */
export class UserSkipError extends Error {
	constructor(message: string) {
		super(message);
	}
}

// js can't even implement modulo correctly...
export function mod(n: number, m: number): number {
	return ((n % m) + m) % m;
}

export function capitalizeFirstLetter(string: string): string {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

// credits to phibr0 on discord
export const ICON_LIST = ['activity', 'airplay', 'alarm-check', 'alarm-clock-off', 'alarm-clock', 'alarm-minus', 'alarm-plus', 'album', 'alert-circle', 'alert-octagon', 'alert-triangle', 'align-center-horizontal', 'align-center-vertical', 'align-center', 'align-end-horizontal', 'align-end-vertical', 'align-horizontal-distribute-center', 'align-horizontal-distribute-end', 'align-horizontal-distribute-start', 'align-horizontal-justify-center', 'align-horizontal-justify-end', 'align-horizontal-justify-start', 'align-horizontal-space-around', 'align-horizontal-space-between', 'align-justify', 'align-left', 'align-right', 'align-start-horizontal', 'align-start-vertical', 'align-vertical-distribute-center', 'align-vertical-distribute-end', 'align-vertical-distribute-start', 'align-vertical-justify-center', 'align-vertical-justify-end', 'align-vertical-justify-start', 'align-vertical-space-around', 'align-vertical-space-between', 'anchor', 'aperture', 'archive', 'arrow-big-down', 'arrow-big-left', 'arrow-big-right', 'arrow-big-up', 'arrow-down-circle', 'arrow-down-left', 'arrow-down-right', 'arrow-down', 'arrow-left-circle', 'arrow-left-right', 'arrow-left', 'arrow-right-circle', 'arrow-right', 'arrow-up-circle', 'arrow-up-left', 'arrow-up-right', 'arrow-up', 'asterisk', 'at-sign', 'award', 'axe', 'banknote', 'bar-chart-2', 'bar-chart', 'baseline', 'battery-charging', 'battery-full', 'battery-low', 'battery-medium', 'battery', 'beaker', 'bell-minus', 'bell-off', 'bell-plus', 'bell-ring', 'bell', 'bike', 'binary', 'bitcoin', 'bluetooth-connected', 'bluetooth-off', 'bluetooth-searching', 'bluetooth', 'bold', 'book-open', 'book', 'bookmark-minus', 'bookmark-plus', 'bookmark', 'bot', 'box-select', 'box', 'briefcase', 'brush', 'bug', 'building-2', 'building', 'bus', 'calculator', 'calendar', 'camera-off', 'camera', 'car', 'carrot', 'cast', 'check-circle-2', 'check-circle', 'check-square', 'check', 'chevron-down', 'chevron-first', 'chevron-last', 'chevron-left', 'chevron-right', 'chevron-up', 'chevrons-down-up', 'chevrons-down', 'chevrons-left', 'chevrons-right', 'chevrons-up-down', 'chevrons-up', 'chrome', 'circle-slashed', 'circle', 'clipboard-check', 'clipboard-copy', 'clipboard-list', 'clipboard-x', 'clipboard', 'clock-1', 'clock-10', 'clock-11', 'clock-12', 'clock-2', 'clock-3', 'clock-4', 'clock-5', 'clock-6', 'clock-7', 'clock-8', 'clock-9', 'clock', 'cloud-drizzle', 'cloud-fog', 'cloud-hail', 'cloud-lightning', 'cloud-moon', 'cloud-off', 'cloud-rain-wind', 'cloud-rain', 'cloud-snow', 'cloud-sun', 'cloud', 'cloudy', 'clover', 'code-2', 'code', 'codepen', 'codesandbox', 'coffee', 'coins', 'columns', 'command', 'compass', 'contact', 'contrast', 'cookie', 'copy', 'copyleft', 'copyright', 'corner-down-left', 'corner-down-right', 'corner-left-down', 'corner-left-up', 'corner-right-down', 'corner-right-up', 'corner-up-left', 'corner-up-right', 'cpu', 'credit-card', 'crop', 'cross', 'crosshair', 'crown', 'currency', 'database', 'delete', 'dice-1', 'dice-2', 'dice-3', 'dice-4', 'dice-5', 'dice-6', 'disc', 'divide-circle', 'divide-square', 'divide', 'dollar-sign', 'download-cloud', 'download', 'dribbble', 'droplet', 'droplets', 'drumstick', 'edit-2', 'edit-3', 'edit', 'egg', 'equal-not', 'equal', 'eraser', 'euro', 'expand', 'external-link', 'eye-off', 'eye', 'facebook', 'fast-forward', 'feather', 'figma', 'file-check-2', 'file-check', 'file-code', 'file-digit', 'file-input', 'file-minus-2', 'file-minus', 'file-output', 'file-plus-2', 'file-plus', 'file-search', 'file-text', 'file-x-2', 'file-x', 'file', 'files', 'film', 'filter', 'flag-off', 'flag-triangle-left', 'flag-triangle-right', 'flag', 'flame', 'flashlight-off', 'flashlight', 'flask-conical', 'flask-round', 'folder-minus', 'folder-open', 'folder-plus', 'folder', 'form-input', 'forward', 'frame', 'framer', 'frown', 'function-square', 'gamepad-2', 'gamepad', 'gauge', 'gavel', 'gem', 'ghost', 'gift', 'git-branch-plus', 'git-branch', 'git-commit', 'git-fork', 'git-merge', 'git-pull-request', 'github', 'gitlab', 'glasses', 'globe-2', 'globe', 'grab', 'graduation-cap', 'grid', 'grip-horizontal', 'grip-vertical', 'hammer', 'hand-metal', 'hand', 'hard-drive', 'hard-hat', 'hash', 'haze', 'headphones', 'heart', 'help-circle', 'hexagon', 'highlighter', 'history', 'home', 'image-minus', 'image-off', 'image-plus', 'image', 'import', 'inbox', 'indent', 'indian-rupee', 'infinity', 'info', 'inspect', 'instagram', 'italic', 'japanese-yen', 'key', 'keyboard', 'landmark', 'languages', 'laptop-2', 'laptop', 'lasso-select', 'lasso', 'layers', 'layout-dashboard', 'layout-grid', 'layout-list', 'layout-template', 'layout', 'library', 'life-buoy', 'lightbulb-off', 'lightbulb', 'link-2-off', 'link-2', 'link', 'linkedin', 'list-checks', 'list-minus', 'list-ordered', 'list-plus', 'list-x', 'list', 'loader-2', 'loader', 'locate-fixed', 'locate-off', 'locate', 'lock', 'log-in', 'log-out', 'mail', 'map-pin', 'map', 'maximize-2', 'maximize', 'megaphone', 'meh', 'menu', 'message-circle', 'message-square', 'mic-off', 'mic', 'minimize-2', 'minimize', 'minus-circle', 'minus-square', 'minus', 'monitor-off', 'monitor-speaker', 'monitor', 'moon', 'more-horizontal', 'more-vertical', 'mountain-snow', 'mountain', 'mouse-pointer-2', 'mouse-pointer-click', 'mouse-pointer', 'mouse', 'move-diagonal-2', 'move-diagonal', 'move-horizontal', 'move-vertical', 'move', 'music', 'navigation-2', 'navigation', 'network', 'octagon', 'option', 'outdent', 'package-check', 'package-minus', 'package-plus', 'package-search', 'package-x', 'package', 'palette', 'palmtree', 'paperclip', 'pause-circle', 'pause-octagon', 'pause', 'pen-tool', 'pencil', 'percent', 'person-standing', 'phone-call', 'phone-forwarded', 'phone-incoming', 'phone-missed', 'phone-off', 'phone-outgoing', 'phone', 'pie-chart', 'piggy-bank', 'pin', 'pipette', 'plane', 'play-circle', 'play', 'plug-zap', 'plus-circle', 'plus-square', 'plus', 'pocket', 'podcast', 'pointer', 'pound-sterling', 'power-off', 'power', 'printer', 'qr-code', 'quote', 'radio-receiver', 'radio', 'redo', 'refresh-ccw', 'refresh-cw', 'regex', 'repeat-1', 'repeat', 'reply-all', 'reply', 'rewind', 'rocket', 'rocking-chair', 'rotate-ccw', 'rotate-cw', 'rss', 'ruler', 'russian-ruble', 'save', 'scale', 'scan-line', 'scan', 'scissors', 'screen-share-off', 'screen-share', 'search', 'send', 'separator-horizontal', 'separator-vertical', 'server-crash', 'server-off', 'server', 'settings-2', 'settings', 'share-2', 'share', 'sheet', 'shield-alert', 'shield-check', 'shield-close', 'shield-off', 'shield', 'shirt', 'shopping-bag', 'shopping-cart', 'shovel', 'shrink', 'shuffle', 'sidebar-close', 'sidebar-open', 'sidebar', 'sigma', 'signal-high', 'signal-low', 'signal-medium', 'signal-zero', 'signal', 'skip-back', 'skip-forward', 'skull', 'slack', 'slash', 'sliders', 'smartphone-charging', 'smartphone', 'smile', 'snowflake', 'sort-asc', 'sort-desc', 'speaker', 'sprout', 'square', 'star-half', 'star', 'stop-circle', 'stretch-horizontal', 'stretch-vertical', 'strikethrough', 'subscript', 'sun', 'sunrise', 'sunset', 'superscript', 'swiss-franc', 'switch-camera', 'table', 'tablet', 'tag', 'target', 'tent', 'terminal-square', 'terminal', 'text-cursor-input', 'text-cursor', 'thermometer-snowflake', 'thermometer-sun', 'thermometer', 'thumbs-down', 'thumbs-up', 'ticket', 'timer-off', 'timer-reset', 'timer', 'toggle-left', 'toggle-right', 'tornado', 'trash-2', 'trash', 'trello', 'trending-down', 'trending-up', 'triangle', 'truck', 'tv-2', 'tv', 'twitch', 'twitter', 'type', 'umbrella', 'underline', 'undo', 'unlink-2', 'unlink', 'unlock', 'upload-cloud', 'upload', 'user-check', 'user-minus', 'user-plus', 'user-x', 'user', 'users', 'verified', 'vibrate', 'video-off', 'video', 'view', 'voicemail', 'volume-1', 'volume-2', 'volume-x', 'volume', 'wallet', 'wand', 'watch', 'waves', 'webcam', 'wifi-off', 'wifi', 'wind', 'wrap-text', 'wrench', 'x-circle', 'x-octagon', 'x-square', 'x', 'youtube', 'zap-off', 'zap', 'zoom-in', 'zoom-out', 'search-large', 'search', 'activity', 'airplay', 'alarm-check', 'alarm-clock-off', 'alarm-clock', 'alarm-minus', 'alarm-plus', 'album', 'alert-circle', 'alert-octagon', 'alert-triangle', 'align-center-horizontal', 'align-center-vertical', 'align-center', 'align-end-horizontal', 'align-end-vertical', 'align-horizontal-distribute-center', 'align-horizontal-distribute-end', 'align-horizontal-distribute-start', 'align-horizontal-justify-center', 'align-horizontal-justify-end', 'align-horizontal-justify-start', 'align-horizontal-space-around', 'align-horizontal-space-between', 'align-justify', 'align-left', 'align-right', 'align-start-horizontal', 'align-start-vertical', 'align-vertical-distribute-center', 'align-vertical-distribute-end', 'align-vertical-distribute-start', 'align-vertical-justify-center', 'align-vertical-justify-end', 'align-vertical-justify-start', 'align-vertical-space-around', 'align-vertical-space-between', 'anchor', 'aperture', 'archive', 'arrow-big-down', 'arrow-big-left', 'arrow-big-right', 'arrow-big-up', 'arrow-down-circle', 'arrow-down-left', 'arrow-down-right', 'arrow-down', 'arrow-left-circle', 'arrow-left-right', 'arrow-left', 'arrow-right-circle', 'arrow-right', 'arrow-up-circle', 'arrow-up-left', 'arrow-up-right', 'arrow-up', 'asterisk', 'at-sign', 'award', 'axe', 'banknote', 'bar-chart-2', 'bar-chart', 'baseline', 'battery-charging', 'battery-full', 'battery-low', 'battery-medium', 'battery', 'beaker', 'bell-minus', 'bell-off', 'bell-plus', 'bell-ring', 'bell', 'bike', 'binary', 'bitcoin', 'bluetooth-connected', 'bluetooth-off', 'bluetooth-searching', 'bluetooth', 'bold', 'book-open', 'book', 'bookmark-minus', 'bookmark-plus', 'bookmark', 'bot', 'box-select', 'box', 'briefcase', 'brush', 'bug', 'building-2', 'building', 'bus', 'calculator', 'calendar', 'camera-off', 'camera', 'car', 'carrot', 'cast', 'check-circle-2', 'check-circle', 'check-square', 'check', 'chevron-down', 'chevron-first', 'chevron-last', 'chevron-left', 'chevron-right', 'chevron-up', 'chevrons-down-up', 'chevrons-down', 'chevrons-left', 'chevrons-right', 'chevrons-up-down', 'chevrons-up', 'chrome', 'circle-slashed', 'circle', 'clipboard-check', 'clipboard-copy', 'clipboard-list', 'clipboard-x', 'clipboard', 'clock-1', 'clock-10', 'clock-11', 'clock-12', 'clock-2', 'clock-3', 'clock-4', 'clock-5', 'clock-6', 'clock-7', 'clock-8', 'clock-9', 'lucide-clock', 'cloud-drizzle', 'cloud-fog', 'cloud-hail', 'cloud-lightning', 'cloud-moon', 'cloud-off', 'cloud-rain-wind', 'cloud-rain', 'cloud-snow', 'cloud-sun', 'lucide-cloud', 'cloudy', 'clover', 'code-2', 'code', 'codepen', 'codesandbox', 'coffee', 'coins', 'columns', 'command', 'compass', 'contact', 'contrast', 'cookie', 'copy', 'copyleft', 'copyright', 'corner-down-left', 'corner-down-right', 'corner-left-down', 'corner-left-up', 'corner-right-down', 'corner-right-up', 'corner-up-left', 'corner-up-right', 'cpu', 'credit-card', 'crop', 'lucide-cross', 'crosshair', 'crown', 'currency', 'database', 'delete', 'dice-1', 'dice-2', 'dice-3', 'dice-4', 'dice-5', 'dice-6', 'disc', 'divide-circle', 'divide-square', 'divide', 'dollar-sign', 'download-cloud', 'download', 'dribbble', 'droplet', 'droplets', 'drumstick', 'edit-2', 'edit-3', 'edit', 'egg', 'equal-not', 'equal', 'eraser', 'euro', 'expand', 'external-link', 'eye-off', 'eye', 'facebook', 'fast-forward', 'feather', 'figma', 'file-check-2', 'file-check', 'file-code', 'file-digit', 'file-input', 'file-minus-2', 'file-minus', 'file-output', 'file-plus-2', 'file-plus', 'file-search', 'file-text', 'file-x-2', 'file-x', 'file', 'files', 'film', 'filter', 'flag-off', 'flag-triangle-left', 'flag-triangle-right', 'flag', 'flame', 'flashlight-off', 'flashlight', 'flask-conical', 'flask-round', 'folder-minus', 'folder-open', 'folder-plus', 'lucide-folder', 'form-input', 'forward', 'frame', 'framer', 'frown', 'function-square', 'gamepad-2', 'gamepad', 'gauge', 'gavel', 'gem', 'ghost', 'gift', 'git-branch-plus', 'git-branch', 'git-commit', 'git-fork', 'git-merge', 'git-pull-request', 'github', 'gitlab', 'glasses', 'globe-2', 'globe', 'grab', 'graduation-cap', 'grid', 'grip-horizontal', 'grip-vertical', 'hammer', 'hand-metal', 'hand', 'hard-drive', 'hard-hat', 'hash', 'haze', 'headphones', 'heart', 'help-circle', 'hexagon', 'highlighter', 'history', 'home', 'image-minus', 'image-off', 'image-plus', 'image', 'import', 'inbox', 'indent', 'indian-rupee', 'infinity', 'lucide-info', 'inspect', 'instagram', 'italic', 'japanese-yen', 'key', 'keyboard', 'landmark', 'lucide-languages', 'laptop-2', 'laptop', 'lasso-select', 'lasso', 'layers', 'layout-dashboard', 'layout-grid', 'layout-list', 'layout-template', 'layout', 'library', 'life-buoy', 'lightbulb-off', 'lightbulb', 'link-2-off', 'link-2', 'lucide-link', 'linkedin', 'list-checks', 'list-minus', 'list-ordered', 'list-plus', 'list-x', 'list', 'loader-2', 'loader', 'locate-fixed', 'locate-off', 'locate', 'lock', 'log-in', 'log-out', 'mail', 'map-pin', 'map', 'maximize-2', 'maximize', 'megaphone', 'meh', 'menu', 'message-circle', 'message-square', 'mic-off', 'mic', 'minimize-2', 'minimize', 'minus-circle', 'minus-square', 'minus', 'monitor-off', 'monitor-speaker', 'monitor', 'moon', 'more-horizontal', 'more-vertical', 'mountain-snow', 'mountain', 'mouse-pointer-2', 'mouse-pointer-click', 'mouse-pointer', 'mouse', 'move-diagonal-2', 'move-diagonal', 'move-horizontal', 'move-vertical', 'move', 'music', 'navigation-2', 'navigation', 'network', 'octagon', 'option', 'outdent', 'package-check', 'package-minus', 'package-plus', 'package-search', 'package-x', 'package', 'palette', 'palmtree', 'paperclip', 'pause-circle', 'pause-octagon', 'pause', 'pen-tool', 'lucide-pencil', 'percent', 'person-standing', 'phone-call', 'phone-forwarded', 'phone-incoming', 'phone-missed', 'phone-off', 'phone-outgoing', 'phone', 'pie-chart', 'piggy-bank', 'lucide-pin', 'pipette', 'plane', 'play-circle', 'play', 'plug-zap', 'plus-circle', 'plus-square', 'plus', 'pocket', 'podcast', 'pointer', 'pound-sterling', 'power-off', 'power', 'printer', 'qr-code', 'quote', 'radio-receiver', 'radio', 'redo', 'refresh-ccw', 'refresh-cw', 'regex', 'repeat-1', 'repeat', 'reply-all', 'reply', 'rewind', 'rocket', 'rocking-chair', 'rotate-ccw', 'rotate-cw', 'rss', 'ruler', 'russian-ruble', 'save', 'scale', 'scan-line', 'scan', 'scissors', 'screen-share-off', 'screen-share', 'lucide-search', 'send', 'separator-horizontal', 'separator-vertical', 'server-crash', 'server-off', 'server', 'settings-2', 'settings', 'share-2', 'share', 'sheet', 'shield-alert', 'shield-check', 'shield-close', 'shield-off', 'shield', 'shirt', 'shopping-bag', 'shopping-cart', 'shovel', 'shrink', 'shuffle', 'sidebar-close', 'sidebar-open', 'sidebar', 'sigma', 'signal-high', 'signal-low', 'signal-medium', 'signal-zero', 'signal', 'skip-back', 'skip-forward', 'skull', 'slack', 'slash', 'sliders', 'smartphone-charging', 'smartphone', 'smile', 'snowflake', 'sort-asc', 'sort-desc', 'speaker', 'sprout', 'square', 'star-half', 'lucide-star', 'stop-circle', 'stretch-horizontal', 'stretch-vertical', 'strikethrough', 'subscript', 'sun', 'sunrise', 'sunset', 'superscript', 'swiss-franc', 'switch-camera', 'table', 'tablet', 'tag', 'target', 'tent', 'terminal-square', 'terminal', 'text-cursor-input', 'text-cursor', 'thermometer-snowflake', 'thermometer-sun', 'thermometer', 'thumbs-down', 'thumbs-up', 'ticket', 'timer-off', 'timer-reset', 'timer', 'toggle-left', 'toggle-right', 'tornado', 'trash-2', 'lucide-trash', 'trello', 'trending-down', 'trending-up', 'triangle', 'truck', 'tv-2', 'tv', 'twitch', 'twitter', 'type', 'umbrella', 'underline', 'undo', 'unlink-2', 'unlink', 'unlock', 'upload-cloud', 'upload', 'user-check', 'user-minus', 'user-plus', 'user-x', 'user', 'users', 'verified', 'vibrate', 'video-off', 'video', 'view', 'voicemail', 'volume-1', 'volume-2', 'volume-x', 'volume', 'wallet', 'wand', 'watch', 'waves', 'webcam', 'wifi-off', 'wifi', 'wind', 'wrap-text', 'wrench', 'x-circle', 'x-octagon', 'x-square', 'x', 'youtube', 'zap-off', 'zap', 'zoom-in', 'zoom-out', 'search-large', 'lucide-search'];

export class PropertyMappingValidationError extends Error {
	constructor(message: string) {
		super(message);
	}
}

export class PropertyMappingNameConflictError extends Error {
	constructor(message: string) {
		super(message);
	}
}

/**
 * - attachTemplate: whether to attach the template (DEFAULT: false)
 * - attachFie: a file to attach (DEFAULT: undefined)
 * - openNote: whether to open the note after creation (DEFAULT: false)
 */
export interface CreateNoteOptions {
	attachTemplate?: boolean,
	attachFile?: TFile,
	openNote?: boolean,
	folder?: TFolder,
}

export function migrateObject<T extends object>(object: T, oldData: any, defaultData: T): void {
	for (const key in object) {
		object[key] = oldData.hasOwnProperty(key) ? oldData[key] : defaultData[key];
	}
}

export function unCamelCase(str: string): string {
	return str
		// insert a space between lower & upper
		.replace(/([a-z])([A-Z])/g, '$1 $2')
		// space before last upper in a sequence followed by lower
		.replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
		// uppercase the first character
		.replace(/^./, function(str){ return str.toUpperCase(); });
}
