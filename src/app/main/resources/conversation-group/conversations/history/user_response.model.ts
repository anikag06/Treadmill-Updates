import {DialogInHistory} from './dialog.model';
import {OptionInHistory} from './option.model';

export class UserResponse {
    created_at!: any;
    dialog_in_history!: DialogInHistory;
    option_in_history!: OptionInHistory;

    constructor(dialog: DialogInHistory, option: OptionInHistory, created_at: any) {
        this.created_at = created_at;
        this.dialog_in_history = dialog;
        this.option_in_history = option;

    }






}
