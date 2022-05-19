import {MediaTypeModel} from './MediaTypeModel';
import {stringifyYaml} from 'obsidian';
import {mediaDbTag} from '../utils/Utils';


export class MusicReleaseModel extends MediaTypeModel {
	type: string;
	subType: string;
	title: string;
	englishTitle: string;
	year: string;
	dataSource: string;
	url: string;
	id: string;

	genres: string[];
	artists: string[];
	rating: number;

	personalRating: number;

	constructor(obj: any = {}) {
		super();

		Object.assign(this, obj);

		this.type = 'musicRelease';
	}

	toMetaData(): string {
		return stringifyYaml({...this, tags: '#' + this.getTags().join('/')});
	}

	getFileName(): string {
		return this.title + ' (' + this.artists.join(', ') + ' - ' + this.year + ' - ' + this.subType + ')';
	}

	getTags(): string[] {
		return [mediaDbTag, 'music', 'album'];
	}

}