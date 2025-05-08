import { TTranslationMap } from '@simra/common-components';
import { EAdminLevel } from './admin-level.enum';

export const AdminLevelTranslationMap: TTranslationMap<EAdminLevel> = {
	[EAdminLevel.FEDERAL_COUNTY]: {
		label: 'REGIONS.BROWSE.GENERAL.REGIONS.ADMIN_LEVEL.FEDERAL_COUNTY',
	},
	[EAdminLevel.COUNTY]: {
		label: 'REGIONS.BROWSE.GENERAL.REGIONS.ADMIN_LEVEL.COUNTY',
	},
	[EAdminLevel.DISTRICT]: {
		label: 'REGIONS.BROWSE.GENERAL.REGIONS.ADMIN_LEVEL.DISTRICT',
	},
}
