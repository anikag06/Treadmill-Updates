// Textual Constants
export const INTRODUCTION = 'INTRODUCTION';
export const LEARN = 'LEARN';
export const DISCUSS = 'DISCUSS';
export const PRACTICE = 'PRACTICE';
export const GAMES = 'games';
export const TOKEN = 'access_token';
export const ISLOGGEDIN = 'is_loggedIn';
export const USERAVATAR = 'user_avatar';
export const ISADMIN = 'is_admin';
export const ISACTIVE = 'is_active';
export const IS_EXP = 'is_exp';
export const USER_EXCLUDED = 'user_excluded';
export const IS_NINETY_DAYS_OVER = 'is_ninety_days_over';
export const IS_VISITED = 'is_visited';
export const USERNAME = 'username';
export const TREADWILL = 'TreadWill';
export const SUNDAY = 'Sunday';
export const MONDAY = 'Monday';
export const WEDNESDAY = 'Wednesday';
export const TUESDAY = 'Tuesday';
export const THURSDAY = 'Thursday';
export const FRIDAY = 'Friday';
export const SATURDAY = 'Saturday';
export const CURRENT_STEP_ID = 'step_id';
export const CURRENT_ACTION = 'action';
export const WEEK = [
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
];
export const NEGATIVE_EMOTIONS = [
  'Sad',
  'Anxious',
  'Angry',
  'Guilty',
  'Jealous',
  'Hopeless',
  'Worthless',
  'Lonely',
  'Frustrated',
  'Embarrassed',
  'Afraid',
];
export const NEUTRAL_EMOTIONS = ['Okay'];
export const POSITIVE_EMOTIONS = [
  'Happy',
  'Excited',
  'Optimistic',
  'Joyful',
  'Confident',
];

// Game names
export const INTERPRETATION_BIAS_GAME = 'Word jumble';
export const EXECUTIVE_CONTROL_GAME = 'Sprint';
export const FRIENDLY_FACE_GAME = 'Find a smile';
export const LEARNED_HELPLESSNESS_GAME = 'Solve it';
export const MENTAL_IMAGERY_GAME = 'Daydream';
export const IDENTIFY_COGNITIVE_DISTORTION_GAME = 'Think positive';

// ibGame time
export const IBG_LESS_TIME = 120;
export const IBG_MORE_TIME = 150;
// LOCAL STORAGE
export const LS_TIME = 120;

// PATHS
export const DEFAULT_PATH = '/landing';
export const LOGGED_IN_PATH = '/main/dashboard';
export const TOKEN_REFRESH_PATH = '/api/v1/user/access-token/refresh/';
export const LOGIN_PATH = '/api/v1/user/login/';
export const SIGN_UP_PATH = '/api/v1/user/registration/';
export const VERIFY_PARTICIPANT = '/api/v1/trial-iitk/verify-sign-up-link/';
// export const VERIFY_PARTICIPANT_AIIMS = '/api/v1/trial-aiims/verify-sign-up-link/';

export const GET_SIGNUP_MAIL = '/api/v1/trial-iitk/get-sign-up-mail/';
export const GET_SIGNUP_MAIL_AIIMS = '/api/v1/trial-aiims/get-sign-up-mail/';


export const PHQ_NINE_SCORE = '/api/v1/questionnaire/phq-user-scores/';
export const GAD_SEVEN_SCORE = '/api/v1/questionnaire/gad-user-scores/';
export const MOBILE_WIDTH = 768;
export const USER_PROFILE = '/api/v1/user/user-profile/';

export const FORGOT_USERNAME_PATH = '/api/v1/user/forgot-username/';
export const RESET_LINK_VALIDITY_SET_NEW_PASSWORD =
  '/api/v1/user/reset-password/';
export const FORGOT_PASSWORD_PATH = '/api/v1/user/get-reset-password-link/';
export const LANDING_RESET_PASSWORD_PATH = '/landing/reset-password';
export const LOGIN_AFTER_RESET = '/landing/login';

// Games Feedback
export const GAMES_FEEDBACK_DATA = '/api/v1/games/common/feedback/';

// Interpretation bias game(IBG) paths
export const IBG_SENTENCE = '/api/v1/games/interpretation-bias/sentences/';
export const IBG_SCORE_INFO = '/api/v1/games/interpretation-bias/score/';
export const IBG_USER_RESPONSE =
  '/api/v1/games/interpretation-bias/user-responses/';

// Executive Control Game(ECG) paths
export const ECG_USER_DATA = '/api/v1/games/executive-control/user-data/';
export const ECG_GAME_DATA = '/api/v1/games/executive-control/game-data/';
export const ECG_FLANKER_TASK = '/api/v1/games/executive-control/flanker-task/';
export const ECG_DISCRIMINATION_TASK =
  '/api/v1/games/executive-control/discrimination-task/';

// Learned Helplessness Game(LHG) paths
export const LHG_POST_COLOR_REVERSE =
  '/api/v1/games/learned-helplessness/color-reverse-attempt/';
export const LHG_GET_COLOR_REVERSE =
  '/api/v1/games/learned-helplessness/color-reverse/';
export const LHG_COLOR_REVERSE_USER_ATTEMPT =
  '/api/v1/games/learned-helplessness/color-reverse-user-attempts/';
export const LHG_USER_LEVEL = '/api/v1/games/learned-helplessness/user-level/';
export const LHG_UNSOLVABLE_TASK2_LEVELS =
  '/api/v1/games/learned-helplessness/unsolvable-tasks2-levels/';
export const LHG_UNSOLVABLE_TASK3_LEVELS =
  '/api/v1/games/learned-helplessness/unsolvable-tasks3-levels/';
export const LHG_UNSOLVABLE_TASK1_LEVEL1 =
  '/api/v1/games/learned-helplessness/unsolvable-tasks1-level1/';
export const LHG_UNSOLVABLE_TASK1_LEVEL2 =
  '/api/v1/games/learned-helplessness/unsolvable-tasks1-level2/';
export const LHG_UNSOLVABLE_TASK2_LEVEL1 =
  '/api/v1/games/learned-helplessness/unsolvable-tasks2-level1/';
export const LHG_UNSOLVABLE_TASK2_LEVEL2 =
  '/api/v1/games/learned-helplessness/unsolvable-tasks2-level2/';
export const LHG_UNSOLVABLE_TASK3_LEVEL1 =
  '/api/v1/games/learned-helplessness/unsolvable-tasks3-level1/';
export const LHG_UNSOLVABLE_TASK3_LEVEL2 =
  '/api/v1/games/learned-helplessness/unsolvable-tasks3-level2/';
export const LHG_USER_OVERALL_DATA =
  '/api/v1/games/learned-helplessness/user-overall-data/';

//  Friendly Face Game (FFG) paths
export const FFG_GET_FRIENDLY_IMAGES =
  '/api/v1/games/face-game/images-friendly/';
export const FFG_GET_HOSTILE_IMAGES = '/api/v1/games/face-game/images-hostile/';
export const FFG_USER_DATA = '/api/v1/games/face-game/user-data/';
export const FFG_PERFORMANCE = '/api/v1/games/face-game/user-performance/';
export const FFG_TOTAL_PERFORMANCE =
  '/api/v1/games/face-game/total-performance/';
export const FFG_MUSIC = '/api/v1/games/face-game/music/';

export const NEW_CHAT = 'new_chat';
export const RESUME_CHAT = 'resume_chat';
export const MAXIMISE_CHAT = 'maximise_chat';
export const REPLY_CURRENT = 'reply_current';
export const UNSPLASH_URL = 'https://api.unsplash.com';
export const GIPHY_URL = 'https://api.giphy.com/v1/gifs/';
export const FEELING_LIST_API =
  '/api/v1/worksheets/thought-record/get-feelings-list/';

export const MAX_RETRIES = 10;
export const CHATBOT_RETRY_TIMEOUT = 5000;

export const SLIDE = 'SLIDE';
export const VIDEO = 'VIDEO';
export const CONVERSATION_GROUP = 'CONVERSATION_GROUP';
export const QUESTIONNAIRE = 'QUESTIONNAIRE';
export const GAME = 'GAME';
export const FORM = 'FORM';
export const SUPPORT_GROUP = 'SUPPORT_GROUP';
export const SURVEY = 'SURVEY';
export const INTRODUCTORY_ANIMATION = 'INTRODUCTORY_ANIMATION';
export const INTRODUCTION_PAGE = 'INTRODUCTION_PAGE';
export const TABLET_WIDTH = 960;
export const CONCLUSION_PAGE = 'CONCLUSION_PAGE';
export const CONTROL_PAGE = 'CONTROL_PAGE';
export const RESOURCES_PAGE = 'RESOURCES_PAGE';
export const TESTIMONIALS_PAGE = 'TESTIMONIALS_PAGE';

export const LOCKED = 'LOCKED';
export const UNLOCKED = 'UNLOCKED';
export const ACTIVE = 'ACTIVE';
export const COMPLETED = 'COMPLETED';
export const SELF_CARE_EXPERT = 'Self-care expert';

export const CHAT_BOT = 'CHAT_BOT';
export const MINDFULNESS_VIDEO = 'MINDFULNESS_VIDEO';

// Mental Imagery Game (MIG) paths
export const MIG_SITUATIONS_DATA = '/api/v1/games/mental-imagery/situations/';
export const MIG_USER_DATA = '/api/v1/games/mental-imagery/user-data/';
export const MIG_STORE_USER_DATA =
  '/api/v1/games/mental-imagery/store-user-data/';

// Identify Cognitive Distortion Game(IDC) paths
export const IDC_SITUATION_DATA =
  '/api/v1/games/cognitive-distortion/icdgame-situation/';
export const IDC_USER_DATA =
  '/api/v1/games/cognitive-distortion/icdgame-user-data/';
export const IDC_USER_ANSWER_DATA =
  '/api/v1/games/cognitive-distortion/icdgame-user-answer/';

// flow and steps related paths
export const FLOW_STEPS_DATA = '/api/v1/flow/flow/';
export const FLOW_STEP_MARK_DONE = '/api/v1/flow/step/';
export const GET_STEP_DATA = '/api/v1/flow/steps/';

// slides path
export const SLIDES_FEEDBACK = '/api/v1/learn/feedback/';
export const STORE_FEEDBACK = '/api/v1/learn/slides-feedback/';
export const SLIDE_COMPLETE_DATA = FLOW_STEP_MARK_DONE;

// slides video
export const VIDEO_OPTED = '/api/v1/resources/mindful-video-opt/';
export const VIDEO_DONT_ASK_AGAIN =
  '/api/v1/resources/mindful-video-dont-ask-again/';
export const SHOW_MINDFULNESS_VIDEO = 'SHOW-MINDFULNESS-VIDEO';

// introduction and conclusion step related paths
export const INTRODUCTION_DATA =
  '/api/v1/introduction-conclusion/user-introduction/';
export const CONCLUSION_DATA =
  '/api/v1/introduction-conclusion/user-conclusion/';

export const GAME_INTERPRETATION_BIAS_CONSTANT = 'GAME-INTERPRETATION-BIAS';
export const GAME_LEARNED_HELPLESSNESS_CONSTANT = 'GAME-LEARNED-HELPLESSNESS';
export const GAME_FRIENDLY_FACE_CONSTANT = 'GAME-FRIENDLY-FACE';
export const GAME_EXECUTIVE_CONTROL_CONSTANT = 'GAME-EXECUTIVE-CONTROL';
export const GAME_IDENTIFY_COGNITIVE_DISTORTION_CONSTANT =
  'GAME-IDENTIFY-COGNITIVE-DISTORTION';
export const GAME_MENTAL_IMAGERY_CONSTANT = 'GAME-MENTAL-IMAGERY';
export const FORM_TASK = 'FORM-TASK';
export const FORM_PROBLEM_SOLVING = 'FORM-PROBLEM-SOLVING';
export const FORM_THOUGHT_RECORD = 'FORM-THOUGHT-RECORD';
export const FORM_WORRY_PRODUCTIVELY = 'FORM-WORRY-PRODUCTIVELY';
export const FORM_BELIEF_CHANGE = 'FORM-BELIEF-CHANGE';
export const FORM_EXPERIMENT_TO_TEST_BELIEF = 'FORM-EXPERIMENT-TO-TEST-BELIEF';

// commitment options
export const COMMITMENT_OPTIONS = [
  '1/day',
  '2/day',
  '3/day',
  '4/day',
  'More than 4/day',
];

// questionnaire constants
export const PHQ9 = 'PHQ9';
export const GAD7 = 'GAD7';
export const SIQ = 'SIQ';
export const LEVEL1 = 'Level 1 Cross-Cutting Symptom Measure';
export const FEAR_QUESTIONNAIRE = 'Fear Questionnaire';
export const MOOD_DISORDER = 'Mood Disorder Questionnaire';
export const AUDITQ = 'Alcohol Use Disorders Identification Test';



// questionnaire paths
export const GET_PHQ_QUESTIONS =
  '/api/v1/questionnaire/phq-nine-questions-list/';
export const GET_GAD_QUESTIONS = '/api/v1/questionnaire/gad-questions-list/';
export const GET_SIQ_QUESTIONS = '/api/v1/questionnaire/siq-questions-list/';
export const USER_PHQ_DATA = '/api/v1/questionnaire/phq-user-response/';
export const USER_GAD_DATA = '/api/v1/questionnaire/gad-user-response/';
export const USER_SIQ_DATA = '/api/v1/questionnaire/siq-user-response/';

export const QUESTIONNAIRE_LIST = '/multi-questionnaire/';
export const TODOQUESTIONNAIRE_LIST = '/multi-questionnaire/todo/';
export const QUESTIONNAIRE_SUBMIT = '/multi-questionnaire/questionnaire-user-response/';
export const QUESTIONNAIRE_RESULT_HISTORY = '/multi-questionnaire/results/';
export const QUESTIONNAIRE_EMAIL_RESULT = '/multi-questionnaire/send-result/';
export const CHOICES_GROUP = 'choices';
export const TEXT_INPUT_GROUP = 'text_input';
// multi-questionarrie/

export const CATEGORY_LIST = ['General mental health problems', 'Mood problems', 'Eating problems', 'Anxiety problems', 'Substance abuse problems'];



// FORMS
export const RECOMMENDED = 'recommended';
export const WORRY_PROBLEM = 'worry';
export const SUMMARY = 'Summary';
export const WPF_WORRY_URL = '/api/v1/worksheets/worry-productively/worry/';
export const USELESS_CHARAC_URL =
  '/api/v1/worksheets/worry-productively/get-useless-characteristics/';
export const WORRY_USELESS_CHARAC =
  '/api/v1/worksheets/worry-productively/worry-useless-characteristics/';
export const THINKING_ERROR_URL =
  '/api/v1/worksheets/worry-productively/get-thinking-errors/';
export const EVALUATE_THINKING_ERROR =
  '/api/v1/worksheets/worry-productively/evaluate-worry-thinking-errors/';
export const EVALUATE_EVIDENCES =
  '/api/v1/worksheets/worry-productively/evaluate-worry-evidences/';
export const EVALUATE_PROBABILITY =
  '/api/v1/worksheets/worry-productively/evaluate-worry/';
export const MODIFY_BELIEFS =
  '/api/v1/worksheets/worry-productively/modify-belief/';
export const DEAL_WITH_WORRY =
  '/api/v1/worksheets/worry-productively/deal-with-worry/';
export const WORRY_PROBLEM_SOLVING =
  '/api/v1/worksheets/worry-productively/problem-solving/';
export const WORRY_FINAL_SLIDER =
  '/api/v1/worksheets/worry-productively/final-worry-rating/';
export const FACE_WORST_FEAR =
  '/api/v1/worksheets/worry-productively/face-worst-fear/';
export const GET_TASKS = '/api/v1/tasks/task/';
export const THINKING_IMG = 'assets/forms/Thinking.svg';
export const WELL_DONE_IMG = 'assets/forms/Well_done.svg';

// Problem solving form
export const PSF_PROBLEM_SOLVING = 'problem-solving';
export const PSF_PROBLEM = 'problem';
export const PSF_PROBLEM_URL = '/api/v1/worksheets/problem-solving/problems/';
export const PSF_SOLUTION_URL = '/api/v1/worksheets/problem-solving/solutions/';
export const PSF_BEST_SOLUTION_URL =
  '/api/v1/worksheets/problem-solving/best-solution/';
export const PSF_PRO_CON_URL = '/api/v1/worksheets/problem-solving/pros-cons/';
export const PSF_RESULT_URL = '/api/v1/worksheets/problem-solving/results/';

// Experiment to test belief form
export const ETTBF_BELIEF_URL = '/api/v1/worksheets/expr-test-belief/beliefs/';
export const ETTBF_OUTCOME_URL =
  '/api/v1/worksheets/expr-test-belief/outcomes/';
export const ETTBF_RATING_QUESTION = 'How strong is your belief?';
export const ETTBF_MIN_RATING_TEXT = 'Not at all';
export const ETTBF_MAX_RATING_TEXT = 'Very strong';
export const TEST_BELIEF_ORIGIN = 'expr_test_belief';
export const ETTBF_EXPECTED_OUTCOME =
  '/api/v1/worksheets/expr-test-belief/beliefs/';

// Task form
export const TASK = 'task';
export const SET_ACTIVITY = 'set-activity';
export const TASK_API = '/api/v1/tasks/task/';
export const SUBTASK_PATH = '/sub-task/?subtask_id=';

// Thought record form
export const THOUGHT_RECORD = 'thought-record';
export const THOUGHT_RECORD_SITUATION_API =
  '/api/v1/worksheets/thought-record/situation/';
export const THOUGHT_RECORD_API = '/api/v1/worksheets/thought-record/thought/';
export const THOUGHT_RECORD_BEHAVIOR_API =
  '/api/v1/worksheets/thought-record/behavior/';
export const THOUGHT_RECORD_FEELING_API =
  '/api/v1/worksheets/thought-record/feelings/';
export const IDENTIFY_THINKING_ERRORS_API =
  '/api/v1/worksheets/thought-record/thinking-errors/';
export const IDENTIFY_THINKING_ERRORS_GET_API =
  '/api/v1/worksheets/thought-record/get-thinking-errors/';
export const RECDORD_OUTCOME_API =
  '/api/v1/worksheets/thought-record/worst-outcome/';
export const THOUGHT_HELP_API =
  '/api/v1/worksheets/thought-record/does-it-help/';
export const FINAL_RATING_THOUGHT_API =
  '/api/v1/worksheets/thought-record/final-rating/';
export const REALISTIC_THOUGHT_API =
  '/api/v1/worksheets/thought-record/realistic-thought/';
export const THOUGHT_PROOF_EVIDENCES_API =
  '/api/v1/worksheets/thought-record/evidences/';
export const THOUGHT_TELL_FRIEND_API =
  '/api/v1/worksheets/thought-record/tell-a-friend/';
export const ALTERNATE_EXPLANATION_API =
  '/api/v1/worksheets/thought-record/alternative-explanation/';
export const SHOW_FULL_FORM_API =
  '/api/v1/worksheets/thought-record/show-full-form/';

// Belief Change Form
export const BELIEF_CHANGE = 'belief-change';
export const PROBLEM_SOLVING = 'problem-solving';
export const WORRY_PRODUCTIVELY = 'worry-productively';
export const TEST_BELIEF = 'test-belief';
export const BELIEF_FORM_API = '/api/v1/worksheets/belief-change/belief/';
export const ACT_AS_IF_API = '/api/v1/worksheets/belief-change/acting-as-if/';
export const ACT_AS_IF_ADVANTAGE_API =
  '/api/v1/worksheets/belief-change/acting-as-if/advantages/';
export const ACT_AS_IF_ADVANTAGE_DELETE_API =
  '/api/v1/worksheets/belief-change/acting-as-if/advantage/delete/';
export const FINAL_RATING_BELIEF_API =
  '/api/v1/worksheets/belief-change/final-rating/';
export const REALISTIC_BELIEF_API =
  '/api/v1/worksheets/belief-change/realistic-belief/';
export const BELIEF_PROOF_EVIDENCES_API =
  '/api/v1/worksheets/belief-change/evidences/';
export const BELIEF_TELL_FRIEND_API =
  '/api/v1/worksheets/belief-change/tell-a-friend/';

// form names
export const PROBLEM_SOLVING_FORM_NAME = 'Solve a problem';
export const SET_TASK_FORM_NAME = 'Set a task';
export const THOUGHT_RECORD_FORM_NAME = 'Evaluate a thought';
export const EXPERIMENT_TO_TEST_BELIEF_FORM_NAME = 'Test a belief';
export const WORRY_PRODUCTIVELY_FORM_NAME = 'Control a worry';
export const BELIEF_CHANGE_FORM_NAME = 'Change a belief';

// trial registration pages
export const INELIGIBLE_FOR_TRIAL = '/trial/thankyou';
export const REGISTRATION_PATH = '/trial/trial-registration';
export const AIIMS_REGISTRATION_PATH = '/aiims532/';
export const OPEN_REGISTRATION_PATH = '/open/';




// country list api
export const GET_COUNTRY_LIST = '/api/v1/user/get-country-list/';
// time zone
export const GET_TIMEZONE = '/api/v1/trial-iitk/get-timezone-list/';
// trial registration steps
export const EMAIL_REGISTRATION = '/api/v1/trial-iitk/register-participant/';
export const AIIMS_EMAIL_REGISTRATION = '/api/v1/trial-aiims/register-aiims-participant/';
export const OPEN_EMAIL_REGISTRATION = '/api/v1/trial-aiims/register-all-participant/';

export const REGISTRATION_STEP_TWO =
  '/api/v1/trial-iitk/participant-information/';
export const AIIMS_REGISTRATION_STEP_TWO = '/api/v1/trial-aiims/participant-information/';

export const REGISTRATION_PHQ_RESPONSE =
  '/api/v1/questionnaire/trial-phq-user-response/';
export const REGISTRATION_GAD_RESPONSE =
  '/api/v1/questionnaire/trial-gad-user-response/';
export const REGISTRATION_SIQ_RESPONSE =
  '/api/v1/questionnaire/trial-siq-user-response/';

export const  AIIMS_REGISTRATION_PHQ_RESPONSE =
  '/api/v1/questionnaire/aiims-trial-phq-user-response/';
export const AIIMS_REGISTRATION_GAD_RESPONSE =
  '/api/v1/questionnaire/aiims-trial-gad-user-response/';
export const AIIMS_REGISTRATION_SIQ_RESPONSE =
  '/api/v1/questionnaire/aiims-trial-siq-user-response/';

export const REGISTRATION_CONSENT = '/api/v1/trial-iitk/participant-consent/';
export const REGISTRATION_CONSENT_AIIMS = '/api/v1/trial-aiims/participant-consent/';

// number of participants left
export const GET_PARTICIPANT_COUNT = '/api/v1/trial-iitk/participant-count/';
// wait-list followup questionaire
export const GET_LINK_DATA = '/api/v1/trial-iitk/verify-wait-list-link/';
// contact us dialog data api
export const CONTACT_US_DATA = '/api/v1/trial-iitk/save-contact-us/';
// contact us dialog data api
export const AIIMS_CONTACT_US_DATA = '/api/v1/trial-aiims/save-contact-us/';

// treadwill email
export const ADMIN_EMAIL = 'treadwill.iitk@gmail.com';

// score
export const SCORE = 'score';
export const INTRODUCTION_SCORE = 20;
export const CONCLUSION_SCORE = 20;
export const SLIDE_COMPLETE_SCORE = 50;
export const CONVERSATION_COMPLETE_SCORE = 100;
export const FEEDBACK_SLIDE_CONVERSATION_SCORE = 20;
export const FEEDBACK_CONVERSATION_SCORE = 20;
export const SUPPORT_GROUP_POST_SCORE = 100;
export const SUPPORT_GROUP_COMMENT_SCORE = 20;
export const SUPPORT_GROUP_UP_DOWN_VOTE_SCORE = 2;
export const SUPPORT_GROUP_THANKING_SCORE = 10;
export const SUPPORT_GROUP_GETTING_UP_VOTE_SCORE = 20;
export const INTRODUCTORY_ANIMATION_STEP_COMPLETE_SCORE = 20;
export const SURVEY_COMPLETE_SCORE = 50;
export const MEDITATION_COMPLETE_SCORE = 50; // before slides
export const PLAYING_GAMES_SCORE = 20; // for a certain number of times
export const FORM_START_SCORE = 20;
export const FORM_START_VIA_CHAT_BOT_SCORE = 20;
export const FOLLOW_UP_FORM_COMPLETE_SCORE = 20; // finish follow up in forms

// support group
export const SUPPORT_GROUP_TAGS_LIST = '/api/v1/support-group/tags-list/';
export const COMMON_EDITOR_CONFIG = {
  editable: true,
  spellcheck: true,
  translate: 'yes',
  enableToolbar: true,
  defaultParagraphSeparator: 'p',
  defaultFontName: 'Roboto',
  defaultFontSize: '3',
  fonts: [],
  uploadUrl: '',
};
export const COMMENT_COMPLAINT = '/api/v1/support-group/comment-complaint/';
export const POST_COMPLAINT = '/api/v1/support-group/post-complaint/';
export const NESTED_COMMENT_COMPLAINT =
  '/api/v1/support-group/nested-comment-complaint/';
export const COMMENT_THANK = '/api/v1/support-group/comment-thank-you/';
export const POST_THANK = '/api/v1/support-group/post-thank-you/';
export const NESTED_COMMENT_THANK =
  '/api/v1/support-group/nested-comment-thank-you/';

export const DEPRESSION_VIDEO_LIST = '/api/v1/resources/general-videos/';
export const VIDEO_COVID_19_LIST = '/api/v1/resources/covid-videos/';
export const READING_LIST = '/api/v1/resources/reading-materials/';
export const USEFUL_LIST = '/api/v1/resources/lists/';
export const MINDFULNESS_VIDEO_LIST = '/api/v1/resources/mindfulness-videos/';
export const EACH_VIDEO = '/api/v1/resources/videos/';
export const WATCHED_VIDEO = '/api/v1/resources/mark-video-watched/';
export const PERSONLISE_POST = '/api/v1/support-group/save-user-tags/';

export const GAMES_PROGRESS_BAR = '/api/v1/games/common/game-bar-data/';

export const USERNAME_AVAILABLE = '/api/v1/user/check-username-availability/';
export const UPDATE_USERNAME = '/api/v1/user/update-username/';
export const UPDATE_NOTIFICATIONS =
  '/api/v1/notifications/update-notification-settings/';
export const UPDATE_PASSWORD = '/api/v1/user/change-password/';

// report bugs
export const REPORT_BUG = '/api/v1/user/bug/';

// toast
export const SHOW_TOAST_DURATION = 10000;

export const FORM_URL_MAP = new Map([
  [FORM_TASK, TASK],
  [FORM_PROBLEM_SOLVING, PROBLEM_SOLVING],
  [FORM_BELIEF_CHANGE, BELIEF_CHANGE],
  [FORM_WORRY_PRODUCTIVELY, WORRY_PRODUCTIVELY],
  [FORM_THOUGHT_RECORD, THOUGHT_RECORD],
  [FORM_EXPERIMENT_TO_TEST_BELIEF, TEST_BELIEF],
]);

export const EXPLORE_MAP = new Map([
  [FORM_TASK, ['/main/resources/forms/' + TASK, SET_TASK_FORM_NAME]],
  [
    FORM_PROBLEM_SOLVING,
    ['/main/resources/forms/' + PROBLEM_SOLVING, PROBLEM_SOLVING_FORM_NAME],
  ],
  [
    FORM_BELIEF_CHANGE,
    ['/main/resources/forms/' + BELIEF_CHANGE, BELIEF_CHANGE_FORM_NAME],
  ],
  [
    FORM_WORRY_PRODUCTIVELY,
    [
      '/main/resources/forms/' + WORRY_PRODUCTIVELY,
      WORRY_PRODUCTIVELY_FORM_NAME,
    ],
  ],
  [
    FORM_THOUGHT_RECORD,
    ['/main/resources/forms/' + THOUGHT_RECORD, THOUGHT_RECORD_FORM_NAME],
  ],
  [
    FORM_EXPERIMENT_TO_TEST_BELIEF,
    [
      '/main/resources/forms/' + TEST_BELIEF,
      EXPERIMENT_TO_TEST_BELIEF_FORM_NAME,
    ],
  ],
  [
    GAME_INTERPRETATION_BIAS_CONSTANT,
    [
      '/main/games/' + GAME_INTERPRETATION_BIAS_CONSTANT,
      'Play: ' + INTERPRETATION_BIAS_GAME,
    ],
  ],
  [
    GAME_LEARNED_HELPLESSNESS_CONSTANT,
    [
      '/main/games/' + GAME_LEARNED_HELPLESSNESS_CONSTANT,
      'Play: ' + LEARNED_HELPLESSNESS_GAME,
    ],
  ],
  [
    GAME_FRIENDLY_FACE_CONSTANT,
    [
      '/main/games/' + GAME_FRIENDLY_FACE_CONSTANT,
      'Play: ' + FRIENDLY_FACE_GAME,
    ],
  ],
  [
    GAME_EXECUTIVE_CONTROL_CONSTANT,
    [
      '/main/games/' + GAME_EXECUTIVE_CONTROL_CONSTANT,
      'Play: ' + EXECUTIVE_CONTROL_GAME,
    ],
  ],
  [
    GAME_IDENTIFY_COGNITIVE_DISTORTION_CONSTANT,
    [
      '/main/games/' + GAME_IDENTIFY_COGNITIVE_DISTORTION_CONSTANT,
      'Play: ' + IDENTIFY_COGNITIVE_DISTORTION_GAME,
    ],
  ],
  [
    GAME_MENTAL_IMAGERY_CONSTANT,
    [
      '/main/games/' + GAME_MENTAL_IMAGERY_CONSTANT,
      'Play: ' + MENTAL_IMAGERY_GAME,
    ],
  ],
  [
    MINDFULNESS_VIDEO,
    [
      '/main/extra-resources/videoItem/',
      'Watch: ',
      '/main/extra-resources/mindfulnessVideo/',
      '/main/extra-resources/videoCovid19/',
    ],
  ],
]);
