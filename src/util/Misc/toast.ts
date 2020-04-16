
export class Toast {
   
    constructor(
        public severity: string,
        public message: string,
        public time: number = 2000,
        public show: boolean = true,
    ){}
}
export const HIDE_TOAST = new Toast('none', '', 0, false)