export class PreferenceValue{
    name: string;
    value: any;
}

export class Preference {
    preferenceId: string;
    ownerId:{
        sectionName:string;
        userId:string;
    }
    values: PreferenceValue[];
}