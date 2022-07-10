import {
  action,
  observable,
  computed,
  makeObservable,
  runInAction,
  autorun,
} from "mobx";

class FormClassMobx {
  emailMobx = "email.com";
  constructor(e) {
    makeObservable(this, {
      emailMobx: observable,
      changeEmail: action,
      emailLength: computed,
    });
    runInAction(this.runOnEveryAction);
    autorun(()=>console.log("auto run"));
  }
  handleAutoRun() {
    console.log("handleAutoRun");
  }
  runOnEveryAction() {
    console.log("runOnEveryAction");
  }
  changeEmail(email) {
    this.emailMobx = email;
  }
  get emailLength() {
    return this.emailMobx.length;
  }
}
export default FormClassMobx;
