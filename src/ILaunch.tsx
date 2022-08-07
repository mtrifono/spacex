interface IRocket {
  name: string;
  id: string;
}

interface ILaunchRocket {
  rocket: IRocket;
}

export default interface ILaunch {
  mission_name: string;
  launch_date_utc: number;
  launch_success: boolean;
  rocket: ILaunchRocket;
  launch_date_unix?: number;
  id?: string;
}
