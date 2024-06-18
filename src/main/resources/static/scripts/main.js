const App = {
    data() {
        return {
            nacitam: false,
            vcetneStornovanych: false,
            aktualniRok: new Date().getFullYear(),
            knihy: [],
            detail: null
        }
    },
    methods: {
        async fetch(url, method = "GET", options = {}, body) {
            options = options ?? {}
            options.method = method
            if (body) {
                options.body = JSON.stringify(body)
            }
            options.headers = {
                ...options.headers,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }

            const resp = await fetch(url, options)
            if (!resp.ok) {
                throw "Komunikace se serverem se nezdařila."
            }
            return await resp.json()
        },
        async nacistSeznam() {
            this.nacitam = true
            try {
                const data = await this.fetch(`/api/?vcetneStornovanych=${this.vcetneStornovanych}`)
                this.knihy = data.content
            } catch (e) {
                alert(e)
            }
            this.nacitam = false
        },
        async nacistDetail(id) {
            try {
                this.detail = await this.fetch(`/api/${id}`)
            } catch (e) {
                alert(e)
            }
        },
        async ulozit(event) {
            event.preventDefault();
            if (this.detail.isbn === '') {
                this.detail.isbn = null
            }

            let url, method
            if (this.detail.id != null) {
                url = `/api/${this.detail.id}`
                method = 'PUT'
            } else {
                url = '/api/'
                method = 'POSt'
            }
            try {
                const data = await this.fetch(url, method, {}, this.detail)
                this.detail = null
                this.nacistSeznam()
            } catch (e) {
                alert(e)
            }
        },
        novaKniha() {
            this.detail = {
                nazev: '',
                autor: '',
                rokVydani: this.aktualniRok,
                isbn: ''
            }
        },
        upravit(id) {
            this.nacistDetail(id)
            //this.detail = {...this.knihy.find(kniha => kniha.id === id)}
        },
        async smazat(id) {
            try {
                const data = await this.fetch(`/api/${id}`, 'DELETE')
                this.nacistSeznam()
            } catch (e) {
                alert(e)
            }
        },
        async obnovit(id) {
            try {
                const data = await this.fetch(`/api/${id}/obnovit`, 'POST')
                this.nacistSeznam()
            } catch (e) {
                alert(e)
            }
        }
    },
    watch: {
        vcetneStornovanych() {
            this.nacistSeznam()
        }
    },
    mounted() {
        this.nacistSeznam()
    },
    template: `
    <div v-if="nacitam" class="spinner-border" role="status">
        <span class="visually-hidden">Načítám data…</span>
    </div>
    
    <div class="d-flex justify-content-between">
        <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model="vcetneStornovanych" id="vcetneStornovanych">
             <label class="form-check-label" for="vcetneStornovanych">Včetně stornovaných</label>
        </div>
        <button type="button" class="btn btn-secondary" @click="nacistSeznam"><i class="bi-arrow-repeat"></i></button>
    </div>
    
    <table v-if="!nacitam" class="table">
      <thead>
        <tr>
          <th scope="col">Název</th>
          <th scope="col">Autor</th>
          <th scope="col">Vydáno</th>
          <th scope="col">ISBN</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="kniha in knihy" :class="{ stornovano: kniha.stornovano }">
          <td>{{kniha.nazev}}</td>
          <td>{{kniha.autor}}</td>
          <td>{{kniha.rokVydani}}</td>
          <td>{{kniha.isbn}}</td>
          <td>
            <button type="button" class="btn btn-outline-primary" @click="upravit(kniha.id)"><i class="bi-pencil-square"></i></button>
            <button type="button" class="btn btn-outline-secondary" @click="smazat(kniha.id)"  v-if="!kniha.stornovano"><i class="bi-trash"></i></button>
            <button type="button" class="btn btn-outline-secondary" @click="obnovit(kniha.id)"  v-if="kniha.stornovano"><i class="bi-recycle"></i></button>
          </td>
        </tr>
      </tbody>
    </table>
    
    <div class="d-flex justify-content-end">
        <button type="button" class="btn btn-primary" @click="novaKniha">Nová kniha</button>
    </div>

    <form v-if="detail" @submit="ulozit">
        <div class="mb-3">
            <label for="nazev" class="form-label">Název</label>
            <input type="text" class="form-control" id="nazev" v-model="detail.nazev" required>
        </div>
        <div class="mb-3">
            <label for="autor" class="form-label">Autor</label>
            <input type="text" class="form-control" id="autor" v-model="detail.autor" required>        
        </div>
        <div class="row">
            <div class="col-6 mb-3">
                <label for="rokVydani" class="form-label">Rok vydání</label>
                <input type="number" class="form-control" id="rokVydani" min="1447" :max="aktualniRok" v-model="detail.rokVydani">
            </div>
            <div class="col-6 mb-3">
                <label for="isbn" class="form-label">ISBN</label>
                <input type="text" class="form-control" id="isbn" v-model="detail.isbn" pattern="[0-9]{13}|[0-9]{9}[0-9X]">
                <div class="fw-light hint">ISBN má 13 číslic, 10 číslic nebo 9 číslic a X.</div>
            </div>
        </div>
        <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-primary">Uložit</button>
        </div>
    </form>
    `
}

Vue.createApp(App)
    .mount("#app");
