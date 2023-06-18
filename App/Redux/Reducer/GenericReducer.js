import { GET_ARTICLE_SEARCH, GET_TOP_STORIES, LOAD_MORE_ARTICLES, LOGIN_USER, TOGGLE_AUTH_LOADER, TOGGLE_LOADER } from "../Types/Types";

const initialState = {
    authLoader: true,
    loader: false,
    authenticated_user: null,
    top_stories: [],
    articleSearch: {
        list: [],
        page: 0,
        loadingmore: false,
        lastpost: true
    }
};

const GenericReducer = (state = initialState, action) => {
    let data = { ...state };
    const { payload } = action;
    switch (action.type) {
        case TOGGLE_AUTH_LOADER:
            data['authLoader'] = payload;
            break;
        case TOGGLE_LOADER:
            data['loader'] = payload;
            break;
        case LOGIN_USER:
            data['authenticated_user'] = payload;
            break;
        case GET_TOP_STORIES:
            data['top_stories'] = payload;
            break;
        case GET_ARTICLE_SEARCH:
            data['articleSearch'] = {
                ...data.articleSearch,
                ...payload
            };
            break;
        case LOAD_MORE_ARTICLES:
            data['articleSearch'] = {
                ...data.articleSearch,
                loadingmore: payload
            };
            break;
        default:
            return state;
    }
    return data;
};

export default GenericReducer;
