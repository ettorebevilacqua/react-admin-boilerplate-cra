import { createListAxio } from './helper.provider';

const apiDef = {
  getQuestion: { url: '/view/getQuestions' },
};

export const providersView = createListAxio(apiDef, 'view/', ['view']);
export const queryViews = provider => providersView[provider].query;
