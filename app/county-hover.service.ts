export class CountyHoverService {
  private static _instance: CountyHoverService;
  private static _isCreating: boolean = false;
  hoverCounty: string;

  static getInstance(): CountyHoverService {
    if (!CountyHoverService._instance) {
      CountyHoverService._isCreating = true;
      CountyHoverService._instance = new CountyHoverService();
      CountyHoverService._isCreating = false;
    }

    return CountyHoverService._instance;
  }

  constructor() {
    if (!CountyHoverService._isCreating) {
      throw new Error('You cannot instantiate a singleton instance.');
    }
  }

  getHoverCounty(): string {
    return this.hoverCounty;
  }

  setHoverCounty(hoverCounty: string): void {
    this.hoverCounty = hoverCounty;
  }
}
