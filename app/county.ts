export class County {
  id: number;
  name: string;
  projects: number;

  constructor(id: number, name: string, projects: number) {
    this.id = id;
    this.name = name;
    this.projects = projects;
  }
}
