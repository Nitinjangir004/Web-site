import { call, put, takeEvery, fork } from 'redux-saga/effects';
import {
  FETCH_COMPETITIONS_REQUEST,
  FETCH_FEATURED_COMPETITIONS_REQUEST,
  FETCH_ACTIVE_COMPETITIONS_REQUEST,
  FETCH_UPCOMING_COMPETITIONS_REQUEST,
  FETCH_COMPETITION_BY_SLUG_REQUEST,
  FETCH_COMPETITION_STATUSES_REQUEST,
  FETCH_COMPETITIONS_BY_STATUS_REQUEST,
  SEARCH_COMPETITIONS_REQUEST,
  CREATE_COMPETITION_REQUEST,
  UPDATE_COMPETITION_REQUEST,
  UPDATE_PARTICIPANTS_REQUEST,
  DELETE_COMPETITION_REQUEST
} from './competitionActionTypes';

import {
  fetchCompetitionsSuccess,
  fetchCompetitionsFailure,
  fetchFeaturedCompetitionsSuccess,
  fetchFeaturedCompetitionsFailure,
  fetchActiveCompetitionsSuccess,
  fetchActiveCompetitionsFailure,
  fetchUpcomingCompetitionsSuccess,
  fetchUpcomingCompetitionsFailure,
  fetchCompetitionBySlugSuccess,
  fetchCompetitionBySlugFailure,
  fetchCompetitionStatusesSuccess,
  fetchCompetitionStatusesFailure,
  fetchCompetitionsByStatusSuccess,
  fetchCompetitionsByStatusFailure,
  searchCompetitionsSuccess,
  searchCompetitionsFailure,
  createCompetitionSuccess,
  createCompetitionFailure,
  updateCompetitionSuccess,
  updateCompetitionFailure,
  updateParticipantsSuccess,
  updateParticipantsFailure,
  deleteCompetitionSuccess,
  deleteCompetitionFailure
} from './competitionActions';

// API Base URL
const API_BASE_URL = 'https://api.churanchacha.in/api/competitions';

// Utility function for retry logic with exponential backoff
async function fetchWithRetry(url, options = {}, attempts = 3) {
  for (let i = 0; i < attempts; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`API call attempt ${i + 1} failed:`, error);
      if (i === attempts - 1) throw error;
      // Exponential backoff: 1s, 2s, 4s
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
}

// Build query string from filters
function buildQueryString(filters) {
  const params = new URLSearchParams();
  
  Object.keys(filters).forEach(key => {
    if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
      params.append(key, filters[key]);
    }
  });
  
  return params.toString();
}

// Normalize response data
function normalizeCompetitionData(apiResponse) {
  if (apiResponse.success && apiResponse.data) {
    return Array.isArray(apiResponse.data) ? apiResponse.data : [apiResponse.data];
  }
  return [];
}

// API Service
const apiService = {
  async getAllCompetitions(filters = {}) {
    const queryString = buildQueryString(filters);
    const url = queryString ? `${API_BASE_URL}?${queryString}` : API_BASE_URL;
    return await fetchWithRetry(url);
  },

  async getFeaturedCompetitions() {
    return await fetchWithRetry(`${API_BASE_URL}/featured`);
  },

  async getActiveCompetitions() {
    return await fetchWithRetry(`${API_BASE_URL}/active`);
  },

  async getUpcomingCompetitions() {
    return await fetchWithRetry(`${API_BASE_URL}/upcoming`);
  },

  async getCompetitionBySlug(slug) {
    const encodedSlug = encodeURIComponent(slug);
    return await fetchWithRetry(`${API_BASE_URL}/slug/${encodedSlug}`);
  },

  async getCompetitionStatuses() {
    return await fetchWithRetry(`${API_BASE_URL}/statuses`);
  },

  async getCompetitionsByStatus(status) {
    const encodedStatus = encodeURIComponent(status);
    return await fetchWithRetry(`${API_BASE_URL}/by-status/${encodedStatus}`);
  },

  async searchCompetitions(query, limit = 10) {
    const queryString = buildQueryString({ search: query, limit });
    return await fetchWithRetry(`${API_BASE_URL}?${queryString}`);
  },

  async createCompetition(competitionData) {
    return await fetchWithRetry(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(competitionData),
    });
  },

  async updateCompetition(id, competitionData) {
    return await fetchWithRetry(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(competitionData),
    });
  },

  async updateParticipants(id, participants) {
    return await fetchWithRetry(`${API_BASE_URL}/${id}/participants`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ participants }),
    });
  },

  async deleteCompetition(id) {
    return await fetchWithRetry(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
  }
};

// Saga Functions
function* fetchCompetitionsSaga(action) {
  try {
    const response = yield call(apiService.getAllCompetitions, action.payload);
    const competitions = normalizeCompetitionData(response);
    yield put(fetchCompetitionsSuccess(competitions, response.pagination || null));
  } catch (error) {
    console.error('Failed to fetch competitions after 3 attempts:', error);
    yield put(fetchCompetitionsFailure(error.message));
  }
}

function* fetchFeaturedCompetitionsSaga() {
  try {
    const response = yield call(apiService.getFeaturedCompetitions);
    const competitions = normalizeCompetitionData(response);
    yield put(fetchFeaturedCompetitionsSuccess(competitions));
  } catch (error) {
    console.error('Failed to fetch featured competitions after 3 attempts:', error);
    yield put(fetchFeaturedCompetitionsFailure(error.message));
  }
}

function* fetchActiveCompetitionsSaga() {
  try {
    const response = yield call(apiService.getActiveCompetitions);
    const competitions = normalizeCompetitionData(response);
    yield put(fetchActiveCompetitionsSuccess(competitions));
  } catch (error) {
    console.error('Failed to fetch active competitions after 3 attempts:', error);
    yield put(fetchActiveCompetitionsFailure(error.message));
  }
}

function* fetchUpcomingCompetitionsSaga() {
  try {
    const response = yield call(apiService.getUpcomingCompetitions);
    const competitions = normalizeCompetitionData(response);
    yield put(fetchUpcomingCompetitionsSuccess(competitions));
  } catch (error) {
    console.error('Failed to fetch upcoming competitions after 3 attempts:', error);
    yield put(fetchUpcomingCompetitionsFailure(error.message));
  }
}

function* fetchCompetitionBySlugSaga(action) {
  try {
    const response = yield call(apiService.getCompetitionBySlug, action.payload);
    if (response.success && response.data) {
      yield put(fetchCompetitionBySlugSuccess(response.data));
    } else {
      throw new Error('Competition not found');
    }
  } catch (error) {
    console.error('Failed to fetch competition by slug after 3 attempts:', error);
    yield put(fetchCompetitionBySlugFailure(error.message));
  }
}

function* fetchCompetitionStatusesSaga() {
  try {
    const response = yield call(apiService.getCompetitionStatuses);
    const statuses = normalizeCompetitionData(response);
    yield put(fetchCompetitionStatusesSuccess(statuses));
  } catch (error) {
    console.error('Failed to fetch competition statuses after 3 attempts:', error);
    yield put(fetchCompetitionStatusesFailure(error.message));
  }
}

function* fetchCompetitionsByStatusSaga(action) {
  try {
    const response = yield call(apiService.getCompetitionsByStatus, action.payload);
    const competitions = normalizeCompetitionData(response);
    yield put(fetchCompetitionsByStatusSuccess(competitions, action.payload));
  } catch (error) {
    console.error('Failed to fetch competitions by status after 3 attempts:', error);
    yield put(fetchCompetitionsByStatusFailure(error.message));
  }
}

function* searchCompetitionsSaga(action) {
  try {
    const { query, limit } = action.payload;
    const response = yield call(apiService.searchCompetitions, query, limit);
    const competitions = normalizeCompetitionData(response);
    yield put(searchCompetitionsSuccess(competitions, query, response.pagination || null));
  } catch (error) {
    console.error('Failed to search competitions after 3 attempts:', error);
    yield put(searchCompetitionsFailure(error.message));
  }
}

function* createCompetitionSaga(action) {
  try {
    const response = yield call(apiService.createCompetition, action.payload);
    if (response.success && response.data) {
      yield put(createCompetitionSuccess(response.data));
    } else {
      throw new Error('Failed to create competition');
    }
  } catch (error) {
    console.error('Failed to create competition after 3 attempts:', error);
    yield put(createCompetitionFailure(error.message));
  }
}

function* updateCompetitionSaga(action) {
  try {
    const { id, competitionData } = action.payload;
    const response = yield call(apiService.updateCompetition, id, competitionData);
    if (response.success && response.data) {
      yield put(updateCompetitionSuccess(response.data));
    } else {
      throw new Error('Failed to update competition');
    }
  } catch (error) {
    console.error('Failed to update competition after 3 attempts:', error);
    yield put(updateCompetitionFailure(error.message));
  }
}

function* updateParticipantsSaga(action) {
  try {
    const { id, participants } = action.payload;
    const response = yield call(apiService.updateParticipants, id, participants);
    if (response.success && response.data) {
      yield put(updateParticipantsSuccess(response.data));
    } else {
      throw new Error('Failed to update participants');
    }
  } catch (error) {
    console.error('Failed to update participants after 3 attempts:', error);
    yield put(updateParticipantsFailure(error.message));
  }
}

function* deleteCompetitionSaga(action) {
  try {
    const response = yield call(apiService.deleteCompetition, action.payload);
    if (response.success) {
      yield put(deleteCompetitionSuccess(action.payload));
    } else {
      throw new Error('Failed to delete competition');
    }
  } catch (error) {
    console.error('Failed to delete competition after 3 attempts:', error);
    yield put(deleteCompetitionFailure(error.message));
  }
}

// Watcher Sagas
function* watchFetchCompetitions() {
  yield takeEvery(FETCH_COMPETITIONS_REQUEST, fetchCompetitionsSaga);
}

function* watchFetchFeaturedCompetitions() {
  yield takeEvery(FETCH_FEATURED_COMPETITIONS_REQUEST, fetchFeaturedCompetitionsSaga);
}

function* watchFetchActiveCompetitions() {
  yield takeEvery(FETCH_ACTIVE_COMPETITIONS_REQUEST, fetchActiveCompetitionsSaga);
}

function* watchFetchUpcomingCompetitions() {
  yield takeEvery(FETCH_UPCOMING_COMPETITIONS_REQUEST, fetchUpcomingCompetitionsSaga);
}

function* watchFetchCompetitionBySlug() {
  yield takeEvery(FETCH_COMPETITION_BY_SLUG_REQUEST, fetchCompetitionBySlugSaga);
}

function* watchFetchCompetitionStatuses() {
  yield takeEvery(FETCH_COMPETITION_STATUSES_REQUEST, fetchCompetitionStatusesSaga);
}

function* watchFetchCompetitionsByStatus() {
  yield takeEvery(FETCH_COMPETITIONS_BY_STATUS_REQUEST, fetchCompetitionsByStatusSaga);
}

function* watchSearchCompetitions() {
  yield takeEvery(SEARCH_COMPETITIONS_REQUEST, searchCompetitionsSaga);
}

function* watchCreateCompetition() {
  yield takeEvery(CREATE_COMPETITION_REQUEST, createCompetitionSaga);
}

function* watchUpdateCompetition() {
  yield takeEvery(UPDATE_COMPETITION_REQUEST, updateCompetitionSaga);
}

function* watchUpdateParticipants() {
  yield takeEvery(UPDATE_PARTICIPANTS_REQUEST, updateParticipantsSaga);
}

function* watchDeleteCompetition() {
  yield takeEvery(DELETE_COMPETITION_REQUEST, deleteCompetitionSaga);
}

// Root Saga
export default function* competitionSaga() {
  yield fork(watchFetchCompetitions);
  yield fork(watchFetchFeaturedCompetitions);
  yield fork(watchFetchActiveCompetitions);
  yield fork(watchFetchUpcomingCompetitions);
  yield fork(watchFetchCompetitionBySlug);
  yield fork(watchFetchCompetitionStatuses);
  yield fork(watchFetchCompetitionsByStatus);
  yield fork(watchSearchCompetitions);
  yield fork(watchCreateCompetition);
  yield fork(watchUpdateCompetition);
  yield fork(watchUpdateParticipants);
  yield fork(watchDeleteCompetition);
} 