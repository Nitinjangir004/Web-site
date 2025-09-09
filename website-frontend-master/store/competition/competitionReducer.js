import {
  FETCH_COMPETITIONS_REQUEST,
  FETCH_COMPETITIONS_SUCCESS,
  FETCH_COMPETITIONS_FAILURE,
  FETCH_FEATURED_COMPETITIONS_REQUEST,
  FETCH_FEATURED_COMPETITIONS_SUCCESS,
  FETCH_FEATURED_COMPETITIONS_FAILURE,
  FETCH_ACTIVE_COMPETITIONS_REQUEST,
  FETCH_ACTIVE_COMPETITIONS_SUCCESS,
  FETCH_ACTIVE_COMPETITIONS_FAILURE,
  FETCH_UPCOMING_COMPETITIONS_REQUEST,
  FETCH_UPCOMING_COMPETITIONS_SUCCESS,
  FETCH_UPCOMING_COMPETITIONS_FAILURE,
  FETCH_COMPETITION_BY_SLUG_REQUEST,
  FETCH_COMPETITION_BY_SLUG_SUCCESS,
  FETCH_COMPETITION_BY_SLUG_FAILURE,
  FETCH_COMPETITION_STATUSES_REQUEST,
  FETCH_COMPETITION_STATUSES_SUCCESS,
  FETCH_COMPETITION_STATUSES_FAILURE,
  FETCH_COMPETITIONS_BY_STATUS_REQUEST,
  FETCH_COMPETITIONS_BY_STATUS_SUCCESS,
  FETCH_COMPETITIONS_BY_STATUS_FAILURE,
  SEARCH_COMPETITIONS_REQUEST,
  SEARCH_COMPETITIONS_SUCCESS,
  SEARCH_COMPETITIONS_FAILURE,
  CREATE_COMPETITION_REQUEST,
  CREATE_COMPETITION_SUCCESS,
  CREATE_COMPETITION_FAILURE,
  UPDATE_COMPETITION_REQUEST,
  UPDATE_COMPETITION_SUCCESS,
  UPDATE_COMPETITION_FAILURE,
  UPDATE_PARTICIPANTS_REQUEST,
  UPDATE_PARTICIPANTS_SUCCESS,
  UPDATE_PARTICIPANTS_FAILURE,
  DELETE_COMPETITION_REQUEST,
  DELETE_COMPETITION_SUCCESS,
  DELETE_COMPETITION_FAILURE
} from './competitionActionTypes';

// Initial State
const initialState = {
  // Main data arrays
  competitions: [],
  featuredCompetitions: [],
  activeCompetitions: [],
  upcomingCompetitions: [],
  
  // Specialized data
  statuses: [],
  competitionsByStatus: {
    items: [],
    status: ''
  },
  
  // Search functionality
  searchResults: {
    results: [],
    query: '',
    pagination: null
  },
  
  // Current competition (for detail page)
  currentCompetition: null,
  
  // Pagination data
  pagination: null,
  
  // Error states (granular)
  error: {
    competitions: null,
    featuredCompetitions: null,
    activeCompetitions: null,
    upcomingCompetitions: null,
    statuses: null,
    competitionsByStatus: null,
    searchResults: null,
    currentCompetition: null,
    create: null,
    update: null,
    delete: null,
    updateParticipants: null
  }
};

// Reducer
const competitionReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch all competitions
    case FETCH_COMPETITIONS_REQUEST:
      return {
        ...state,
        error: { ...state.error, competitions: null }
      };
    
    case FETCH_COMPETITIONS_SUCCESS:
      return {
        ...state,
        competitions: action.payload.competitions,
        pagination: action.payload.pagination,
        error: { ...state.error, competitions: null }
      };
    
    case FETCH_COMPETITIONS_FAILURE:
      return {
        ...state,
        competitions: [],
        pagination: null,
        error: { ...state.error, competitions: action.payload }
      };

    // Fetch featured competitions
    case FETCH_FEATURED_COMPETITIONS_REQUEST:
      return {
        ...state,
        error: { ...state.error, featuredCompetitions: null }
      };
    
    case FETCH_FEATURED_COMPETITIONS_SUCCESS:
      return {
        ...state,
        featuredCompetitions: action.payload,
        error: { ...state.error, featuredCompetitions: null }
      };
    
    case FETCH_FEATURED_COMPETITIONS_FAILURE:
      return {
        ...state,
        featuredCompetitions: [],
        error: { ...state.error, featuredCompetitions: action.payload }
      };

    // Fetch active competitions
    case FETCH_ACTIVE_COMPETITIONS_REQUEST:
      return {
        ...state,
        error: { ...state.error, activeCompetitions: null }
      };
    
    case FETCH_ACTIVE_COMPETITIONS_SUCCESS:
      return {
        ...state,
        activeCompetitions: action.payload,
        error: { ...state.error, activeCompetitions: null }
      };
    
    case FETCH_ACTIVE_COMPETITIONS_FAILURE:
      return {
        ...state,
        activeCompetitions: [],
        error: { ...state.error, activeCompetitions: action.payload }
      };

    // Fetch upcoming competitions
    case FETCH_UPCOMING_COMPETITIONS_REQUEST:
      return {
        ...state,
        error: { ...state.error, upcomingCompetitions: null }
      };
    
    case FETCH_UPCOMING_COMPETITIONS_SUCCESS:
      return {
        ...state,
        upcomingCompetitions: action.payload,
        error: { ...state.error, upcomingCompetitions: null }
      };
    
    case FETCH_UPCOMING_COMPETITIONS_FAILURE:
      return {
        ...state,
        upcomingCompetitions: [],
        error: { ...state.error, upcomingCompetitions: action.payload }
      };

    // Fetch competition by slug
    case FETCH_COMPETITION_BY_SLUG_REQUEST:
      return {
        ...state,
        currentCompetition: null,
        error: { ...state.error, currentCompetition: null }
      };
    
    case FETCH_COMPETITION_BY_SLUG_SUCCESS:
      return {
        ...state,
        currentCompetition: action.payload,
        error: { ...state.error, currentCompetition: null }
      };
    
    case FETCH_COMPETITION_BY_SLUG_FAILURE:
      return {
        ...state,
        currentCompetition: null,
        error: { ...state.error, currentCompetition: action.payload }
      };

    // Fetch competition statuses
    case FETCH_COMPETITION_STATUSES_REQUEST:
      return {
        ...state,
        error: { ...state.error, statuses: null }
      };
    
    case FETCH_COMPETITION_STATUSES_SUCCESS:
      return {
        ...state,
        statuses: action.payload,
        error: { ...state.error, statuses: null }
      };
    
    case FETCH_COMPETITION_STATUSES_FAILURE:
      return {
        ...state,
        statuses: [],
        error: { ...state.error, statuses: action.payload }
      };

    // Fetch competitions by status
    case FETCH_COMPETITIONS_BY_STATUS_REQUEST:
      return {
        ...state,
        error: { ...state.error, competitionsByStatus: null }
      };
    
    case FETCH_COMPETITIONS_BY_STATUS_SUCCESS:
      return {
        ...state,
        competitionsByStatus: {
          items: action.payload.competitions,
          status: action.payload.status
        },
        error: { ...state.error, competitionsByStatus: null }
      };
    
    case FETCH_COMPETITIONS_BY_STATUS_FAILURE:
      return {
        ...state,
        competitionsByStatus: {
          items: [],
          status: ''
        },
        error: { ...state.error, competitionsByStatus: action.payload }
      };

    // Search competitions
    case SEARCH_COMPETITIONS_REQUEST:
      return {
        ...state,
        error: { ...state.error, searchResults: null }
      };
    
    case SEARCH_COMPETITIONS_SUCCESS:
      return {
        ...state,
        searchResults: {
          results: action.payload.results,
          query: action.payload.query,
          pagination: action.payload.pagination
        },
        error: { ...state.error, searchResults: null }
      };
    
    case SEARCH_COMPETITIONS_FAILURE:
      return {
        ...state,
        searchResults: {
          results: [],
          query: '',
          pagination: null
        },
        error: { ...state.error, searchResults: action.payload }
      };

    // Create competition
    case CREATE_COMPETITION_REQUEST:
      return {
        ...state,
        error: { ...state.error, create: null }
      };
    
    case CREATE_COMPETITION_SUCCESS:
      return {
        ...state,
        competitions: [...state.competitions, action.payload],
        error: { ...state.error, create: null }
      };
    
    case CREATE_COMPETITION_FAILURE:
      return {
        ...state,
        error: { ...state.error, create: action.payload }
      };

    // Update competition
    case UPDATE_COMPETITION_REQUEST:
      return {
        ...state,
        error: { ...state.error, update: null }
      };
    
    case UPDATE_COMPETITION_SUCCESS:
      return {
        ...state,
        competitions: state.competitions.map(competition =>
          competition.id === action.payload.id ? action.payload : competition
        ),
        currentCompetition: state.currentCompetition && state.currentCompetition.id === action.payload.id 
          ? action.payload 
          : state.currentCompetition,
        error: { ...state.error, update: null }
      };
    
    case UPDATE_COMPETITION_FAILURE:
      return {
        ...state,
        error: { ...state.error, update: action.payload }
      };

    // Update participants
    case UPDATE_PARTICIPANTS_REQUEST:
      return {
        ...state,
        error: { ...state.error, updateParticipants: null }
      };
    
    case UPDATE_PARTICIPANTS_SUCCESS:
      return {
        ...state,
        competitions: state.competitions.map(competition =>
          competition.id === action.payload.id ? action.payload : competition
        ),
        activeCompetitions: state.activeCompetitions.map(competition =>
          competition.id === action.payload.id ? action.payload : competition
        ),
        currentCompetition: state.currentCompetition && state.currentCompetition.id === action.payload.id 
          ? action.payload 
          : state.currentCompetition,
        error: { ...state.error, updateParticipants: null }
      };
    
    case UPDATE_PARTICIPANTS_FAILURE:
      return {
        ...state,
        error: { ...state.error, updateParticipants: action.payload }
      };

    // Delete competition
    case DELETE_COMPETITION_REQUEST:
      return {
        ...state,
        error: { ...state.error, delete: null }
      };
    
    case DELETE_COMPETITION_SUCCESS:
      return {
        ...state,
        competitions: state.competitions.filter(competition => competition.id !== action.payload),
        activeCompetitions: state.activeCompetitions.filter(competition => competition.id !== action.payload),
        upcomingCompetitions: state.upcomingCompetitions.filter(competition => competition.id !== action.payload),
        featuredCompetitions: state.featuredCompetitions.filter(competition => competition.id !== action.payload),
        currentCompetition: state.currentCompetition && state.currentCompetition.id === action.payload 
          ? null 
          : state.currentCompetition,
        error: { ...state.error, delete: null }
      };
    
    case DELETE_COMPETITION_FAILURE:
      return {
        ...state,
        error: { ...state.error, delete: action.payload }
      };

    default:
      return state;
  }
};

export default competitionReducer; 