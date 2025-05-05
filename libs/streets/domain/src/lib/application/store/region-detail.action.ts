export class SetRegionName {
	  static readonly type = '[Region] Set Region Name';
  constructor(public payload: { name: string }) {}
}
