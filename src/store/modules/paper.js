import { getExaminationPaperList} from 'api/test/paper';

const paper = {
	state: {
		new_paper_id: {},
    paper_id_list: [],
    paper_list: []
  },
  mutations: {
  	SET_NEW_PAPER_ID: (state, id) => {
  		state.new_paper_id = id;
  	},
  	SET_PAPER_ID_LIST: (state, id_list) => {
  		state.paper_id_list = id_list;
  	},
  	SET_PAPER_LIST: (state, list) => {
  		state.paper_list = list;
  	}
  },
  actions: {
  	SetPaper({ commit, state }, query) {
  		return new Promise((resolve, reject) => {
  			getExaminationPaperList(query).then(res => {

  			}).catch(error => {
          console.log(error);
          reject(error);
        });
  		})
  	}
  }
}