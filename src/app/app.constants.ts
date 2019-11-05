// Textual Constants
export const INTRODUCTION       = 'INTRODUCTION';
export const LEARN              = 'LEARN';
export const DISCUSS            = 'DISCUSS';
export const PRACTICE           = 'PRACTICE';
export const GAMES              = 'games';
export const MODULES            = 'modules';
export const CATEGORY           = 'category_';
export const TOKEN              = 'jwt_token';
export const USERAVATAR         = 'user_avatar';
export const ISADMIN            = 'is_admin';
export const ISACTIVE           = 'is_active';
export const TREADWILL          = 'TreadWill';
export const SUNDAY             = 'SUNDAY';
export const MONDAY             = 'MONDAY';
export const TUESDAY            = 'TUESDAY';
export const WEDNESDAY          = 'WEDNESDAY';
export const THURSDAY           = 'THURSDAY';
export const FRIDAY             = 'FRIDAY';
export const SATURDAY           = 'SATURDAY';
export const WEEK               = [SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY];

// ibGame time
export const IBG_LESS_TIME = 120;
export const IBG_MORE_TIME = 150;

// LOCAL STORAGE
export const LS_TIME            = 120;

// PATHS
export const DEFAULT_PATH       = '/landing';
export const LOGGED_IN_PATH     = '/dashboard';
export const TOKEN_REFRESH_PATH = '/api/v1/user/api-token-refresh/';
export const LOGIN_PATH         = '/api/v1/user/login/';
export const SIGNUP_PATH 		= '/api/v1/user/registration/';
export const PHQ_NINE_SCORE     = '/api/v1/questionnaire/phq-user-scores/';
export const GAD_SEVEN_SCORE    = '/api/v1/questionnaire/gad-user-scores/';
export const MOBILEWIDTH        = 768;

// Interpretation bias game(IBG) paths
export const IBG_SENTENCE        = '/api/v1/games/interpretation-bias/sentences/';
export const IBG_SCOREINFO       = '/api/v1/games/interpretation-bias/score/';
export const IBG_USER_RESPONSE  = '/api/v1/games/interpretation-bias/user-responses/';

export const PROBLEM_SOLVING = 'problem-solving';
export const TASK            = 'tasks';
export const PROBLEM         = 'problem';
export const RECOMMENDED       = 'recommended';

// Executive Control Game(ECG) paths
export const ECG_USER_DATA      = '/api/v1/games/executive-control/user-data/';
export const ECG_GAME_DATA      = '/api/v1/games/executive-control/game-data/';
export const ECG_FLANKER_TASK   = '/api/v1/games/executive-control/flanker-task/';
export const ECG_DISCIMINATION_TASK = '/api/v1/games/executive-control/discrimination-task/';

// Learned Helplessness Game(LHG) paths
export const LHG_POST_COLOR_REVERSE = '/api/v1/games/learned-helplessness/color-reverse-attempt/';
export const LHG_GET_COLOR_REVERSE  = '/api/v1/games/learned-helplessness/color-reverse/';
export const LHG_COLOR_REVERSE_USER_ATTEMPT = '/api/v1/games/learned-helplessness/color-reverse-user-attempts/';
export const LHG_USER_LEVEL         = '/api/v1/games/learned-helplessness/user-level/';
export const LHG_UNSOLVABLE_TASK2_LEVELS = '/api/v1/games/learned-helplessness/unsolvable-tasks2-levels/';
export const LHG_UNSOLVABLE_TASK3_LEVELS = '/api/v1/games/learned-helplessness/unsolvable-tasks3-levels/';
export const LHG_UNSOLVABLE_TASK1_LEVEL1 = '/api/v1/games/learned-helplessness/unsolvable-tasks1-level1/';
export const LHG_UNSOLVABLE_TASK1_LEVEL2 = '/api/v1/games/learned-helplessness/unsolvable-tasks1-level2/';
export const LHG_UNSOLVABLE_TASK2_LEVEL1 = '/api/v1/games/learned-helplessness/unsolvable-tasks2-level1/';
export const LHG_UNSOLVABLE_TASK2_LEVEL2 = '/api/v1/games/learned-helplessness/unsolvable-tasks2-level2/';
export const LHG_UNSOLVABLE_TASK3_LEVEL1 = '/api/v1/games/learned-helplessness/unsolvable-tasks3-level1/';
export const LHG_UNSOLVABLE_TASK3_LEVEL2 = '/api/v1/games/learned-helplessness/unsolvable-tasks3-level2/';

//  Friendly Face Game (FFG) paths
export const FFG_GET_FRIENDLY_IMAGES = '/api/v1/games/face-game/images-hostile/';
export const FFG_GET_HOSTILE_IMAGES = '/api/v1/games/face-game/images-friendly/';
export const FFG_USER_DATA       = '/api/v1/games/face-game/user/';
export const FFG_PERFORMANCE     = '/api/v1/games/face-game/performance/';
export const FFG_TOTAL_PERFORMANCE  = '/api/v1/games/face-game/total-performance/';
export const FFG_MUSIC           = '/api/v1/games/face-game/music/';


export const NEW_CHAT = 'new_chat';
export const RESUME_CHAT = 'resume_chat';
export const REPLY_CURRENT = 'reply_current';

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
export const CONCLUSION_PAGE = 'CONCLUSION_PAGE';

export const LOCKED = 'LOCKED';
export const UNLOCKED = 'UNLOCKED';
export const ACTIVE = 'ACTIVE';
export const COMPLETED = 'COMPLETED';

// flow and steps related paths
export const FLOW_STEPS_DATA = '/api/v1/flow/flow/';
export const FLOW_STEP_MARK_DONE = '/api/v1/flow/step/';
export const GET_STEP_DATA  = '/api/v1/flow/steps/';

// slides path
export const SLIDES_FEEDBACK = '/api/v1/learn/feedback/';
export const STORE_FEEDBACK = '/api/v1/learn/slides-feedback/';
export const SLIDE_COMPLETE_DATA = FLOW_STEP_MARK_DONE;

// introduction step related paths
export const INTRODUCTION_DATA = '/api/v1/introduction-conclusion/user-introduction/';

export const GAME_ATTRIBUTION_STYLE = 'GAME-ATTRIBUTION-STYLE';
export const GAME_INTERPRETATION_BIAS = 'GAME-INTERPRETATION-BIAS';
export const GAME_LEARNED_HELPLESSNESS = 'GAME-LEARNED-HELPLESSNESS';
export const GAME_FRIENDLY_FACE = 'GAME-FRIENDLY-FACE';
export const GAME_EXECUTIVE_CONTROL = 'GAME-EXECUTIVE-CONTROL';
export const GAME_IDENTIFY_COGNITIVE_DISTORTION = 'GAME-IDENTIFY-COGNITIVE-DISTORTION';
export const GAME_MENTAL_IMAGERY = 'GAME-MENTAL-IMAGERY';
export const FORM_TASK = 'FORM-TASK';
export const FORM_PROBLEM_SOLVING_WORKSHEET = 'FORM-PROBLEM-SOLVING-WORKSHEET';
