export default class QDictionary<T> {
    private m_data: { [key: string]: T } = null;
    private m_recache: boolean = false;
    private m_keys: any[] = [];
    private m_values: T[] = [];

    public set(key: string | number, value: T): void {
        if (this.m_data == null) {
            this.m_data = {};
        }
        this.m_data[key] = value;
        this.m_recache = true;
        let syabol = Symbol();
    }

    public get(key: string | number): T {
        if (this.m_data == null) return null;
        if (key == undefined && key == null) return null;
        if (this.m_data.hasOwnProperty(key.toString())) {
            return this.m_data[key];
        }
        return null;
    }

    public contentsKey(key: string | number): boolean {
        if (key == null || key == undefined) return false;
        if (this.m_data != null && this.m_data.hasOwnProperty(key.toString())) {
            return true;
        } else {
            return false;
        }
    }

    public remove(key: string | number): boolean {
        if (key == null || key == undefined) return false;
        if (this.m_data != null && this.m_data.hasOwnProperty(key.toString())) {
            delete this.m_data[key];
            this.m_recache = true;
            return true;
        } else {
            return false;
        }
    }

    public clear() {
        this.m_recache = true;
        this.m_keys.length = 0;
        this.m_values.length = 0;
        this.m_data = null;
    }

    public get keys(): Array<any> {
        if (!this.m_data) {
            return [];
        }

        return Object.keys(this.m_data);
    }

    public get values(): Array<T> {
        this.checkRecache();
        return this.m_values;
    }

    public get datas(): { [key: string]: T } {
        if (!this.m_data) {
            this.m_data = {};
        }

        return this.m_data;
    }

    public get length(): number {
        if (!this.m_data) {
            return 0;
        }

        return Object.keys(this.m_data).length;
    }

    public toString(): string {
        let str: string = '';
        for (let key in this.m_data) {
            str += '[' + key + ' : ' + this.m_data[key] + ']\n';
        }
        return str;
    }

    private checkRecache() {
        if (this.m_recache) {
            this.m_keys = [];
            this.m_values = [];

            if (this.m_data != null) {
                for (let key in this.m_data) {
                    this.m_keys.push(key);
                    this.m_values.push(this.m_data[key]);
                }
            }
            this.m_recache = false;
        }
    }
}
