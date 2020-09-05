import * as signalR from "@aspnet/signalr";
import store from "../store";

class SignalR {
  private connection!: signalR.HubConnection;
  private hubUrl!: string;
  public async startConnection(): Promise<boolean> {
    // unavailable on frontend, implement your own or get netcoresaas.com
    return true;
  }
  public closeConnection() {
    // unavailable on frontend, implement your own or get netcoresaas.com
  }
  public async on(
    methodName: string,
    newMethod: (...args: any[]) => void
  ): Promise<void> {
    // unavailable on frontend, implement your own or get netcoresaas.com
  }
  public async invoke<T = any>(methodName: string, ...args: any[]): Promise<T> {
    return new Promise((resolve, reject) => {
      // unavailable on frontend, implement your own or get netcoresaas.com
      resolve();
    });
  }
  private async joinGroup() {
    // unavailable on frontend, implement your own or get netcoresaas.com
  }
}
export const SignalService = new SignalR();
