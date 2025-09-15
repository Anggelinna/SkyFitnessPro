
export const sharedStyles = {

  /* common */

  shadowedBlock: "shadowedBlock shadow-3xl",
  scaledBlock: "scaledBlock duration-300 hover:scale-102",
  hiddenBlock: "hiddenBlock main:hidden",
  text_18_20: "text_18_20 text-lg/5",

  /* courses */

  colors: "colors bg-aerobics bg-body-flex bg-stretching bg-yoga bg-zumba",

  /* button */

  buttonCommon: "buttonCommon h-9 w-[83px] rounded-[46px] duration-300 main:h-13 main:w-[103px]",
  buttonPrimary: "buttonPrimary bg-good hover:bg-well active:bg-black active:text-white disabled:bg-light-bg disabled:text-light-tx",
  buttonSecondary: "buttonSecondary border border-black bg-white hover:bg-light-bg active:bg-dark disabled:text-light-tx",
  buttonWide: "buttonWide h-[50px] w-full main:h-13 main:w-full",
  buttonWideWithFields: "buttonWideWithFields h-[50px] w-full text-nowrap px-11 main:h-13 main:w-full",
  buttonWideWithMargin: "buttonWideWithMargin mt-7 h-[50px] w-full main:mt-10 main:h-13 main:w-full",

  /* main */

  wrapper: "wrapper flex h-[100vh] flex-col justify-between",
  container: "container m-auto w-[343px] flex-1 main:w-[1160px]",

  /* header */

  header: "header flex w-full justify-between py-10 main:pb-[60px] main:pt-[50px]",
  headerContainer: "headerContainer flex w-1/2 flex-col justify-start gap-[15px] text-left",
  headerLogo: "headerLogo h-[35px] w-[220px]",
  headerSlogan: "headerSlogan hidden main:block",
  headerUserGroup: "headerUserGroup relative flex h-9 items-center gap-4 main:h-[50px]",
  headerProfileBlock: "headerProfileBlock group/profile hidden items-center gap-3 main:flex",
  headerProfileBlockSmall: "headerProfileBlockSmall group/profile flex items-center gap-3 main:hidden",
  headerProfileLogo: "headerProfileLogo h-9 w-9 main:h-[50px] main:w-[50px]",
  headerProfileName: "headerProfileName text-2xl/[26px] hover:underline group-hover/profile:text-404",
  headerProfileNameBtn: "headerProfileNameBtn mr-px h-2 w-2 rotate-45 border-b-2 border-r-2 group-hover/profile:border-404",
  headerProfileNameBtnReversed: "headerProfileNameBtnReversed rotate-225",

  /* caption */

  caption: "caption flex justify-between text-left",
  captionText: "captionText mb-[34px] max-w-[864px] text-[32px]/9 font-medium main:mb-[50px] main:text-6xl",
  captionBalloon: "captionBalloon relative hidden main:block",
  captionBalloonTail: "captionBalloonTail absolute right-[140px] top-[85px] h-9 w-[30px]",
  captionBalloonFace: "captionBalloonFace relative z-10 h-[102px] w-[288px] rounded-[5px] bg-good px-5 py-4 text-[32px]/9",

  /* banner */

  banner: "banner relative mb-[40px] h-[389px] w-[343px] overflow-hidden rounded-[30px] p-10 text-white main:mb-[60px] main:h-[310px] main:w-[1160px]",
  bannerText: "bannerText relative z-10 mb-[18px] hidden text-6xl/[66px] font-medium main:block",
  bannerPicture: "bannerPicture absolute",
  "banner-yoga": "banner-yoga top-[-55px] main:right-[-295px] main:top-[-175px] main:w-[80%]",
  "banner-stretching": "banner-stretching main:right-[-10px] main:top-0 main:w-[30%]",
  "banner-zumba": "banner-zumba main:right-[-271px] main:top-[-37px] main:w-[78%]",
  "banner-aerobics": "banner-aerobics top-[-651px] main:right-0 main:top-[-315px] main:w-[40%]",
  "banner-body-flex": "banner-body-flex top-[-113px] main:right-[-200px] main:top-[-155px] main:w-[70%]",

  /* card */

  cards: "cards flex w-full flex-wrap justify-start gap-6 main:gap-10",
  card: "card relative w-[343px] rounded-[30px] bg-white hover:z-40 main:w-[360px]",
  cardPicture: "cardPicture relative h-[325px] w-[343px] overflow-hidden rounded-[30px] main:w-[360px]",
  cardInner: "cardInner absolute",
  "card-yoga": "card-yoga right-[-232px] top-[-119px] min-h-[557px] min-w-[834px]",
  "card-stretching": "card-stretching right-0 top-0 min-h-[540px] min-w-[360px]",
  "card-zumba": "card-zumba -top-8 right-[-398px] min-h-[767px] min-w-[1150px]",
  "card-aerobics": "card-aerobics right-[-82px] top-[-715px] min-h-[1081px] min-w-[721px]",
  "card-body-flex": "card-body-flex right-[-182px] top-[-168px] min-h-[514px] min-w-[771px]",
  cardAction: "cardAction group/card absolute h-8 w-8",
  cardAddBtn: "cardAddBtn absolute left-[291px] top-[-305px] h-8 w-8 cursor-arrow duration-300 hover:scale-110 main:left-[308px]",
  cardActionTooltip: "cardActionTooltip absolute left-[352px] top-[-262px] hidden h-[27px] w-max items-center justify-center rounded-[5px] border border-black bg-white p-1.5 text-sm main:group-hover/card:flex",
  cardBlock: "cardBlock mx-auto flex w-[300px] flex-col gap-10 pb-[15px] pt-6",
  cardContent: "cardContent flex flex-col gap-5",
  cardTitle: "cardTitle text-2xl/[26px] font-medium main:text-[32px]/9",
  cardTablets: "cardTablets flex flex-wrap gap-[6px]",
  cardTablet: "cardTablet flex h-[38px] gap-[6px] rounded-[50px] bg-light-bg p-[10px]",
  cardTabletText: "cardTabletText text-nowrap text-base/[18px]",

  /* presentation */

  presentation: "presentation my-[40px] main:my-[60px]",
  presentationTitle: "presentationTitle mb-6 text-2xl/[26px] font-medium main:mb-10 main:text-[40px]/[44px]",
  presentationContent: "presentationContent flex flex-col justify-between gap-[17px] text-left main:flex-row",
  presentationBlock: "presentationBlock flex h-[141px] items-center gap-[25px] rounded-[28px] bg-black px-5",
  presentationNumber: "presentationNumber text-[75px]/[102px] font-medium text-good",
  presentationText: "presentationText text-lg/5 text-white main:text-2xl/[30px]",
  presentationGoals: "presentationGoals flex flex-wrap gap-x-31 gap-y-6 rounded-[28px] bg-good p-[30px] text-lg/5 main:gap-y-[34px] main:text-2xl/[26px]",
  presentationGoal: "presentationGoal flex h-13/2 w-[284px] items-center gap-2",
  presentationGoalStar: "presentationGoalStar h-13/2 w-[26px]",
  presentationNewLifeSection: "presentationNewLifeSection relative mx-auto mt-[116px] w-[482px] main:mt-[42px] main:w-[1160px]",
  presentationNewLife: "presentationNewLife presentationNewLife relative z-10 m-auto w-[343px] rounded-[30px] bg-white p-[30px] main:z-0 main:mt-0 main:w-[1160px] main:p-10",
  presentationNewLifeTitle: "presentationNewLifeTitle mb-9 text-[32px]/9 font-medium main:mb-10 main:text-6xl",
  presentationNewLifeLeft: "presentationNewLifeLeft relative z-10 list-inside main:w-[448px]",
  presentationNewLifeLeftItem: "presentationNewLifeLeftItem list-disc text-lg opacity-60 main:text-2xl",
  presentationNewLifeRight: "presentationNewLifeRight absolute bottom-0 right-0 hidden h-full w-full overflow-hidden main:block",
  presentationNewLifeLines: "presentationNewLifeLines absolute bottom-[-58px] right-[30px] h-[530px] w-[635px]",
  presentationNewLifeMan: "presentationNewLifeMan absolute bottom-[9px] right-[9px] hidden h-[570px] w-[550px] main:block",
  presentationNewLifeManSmall: "presentationNewLifeManSmall presentationNewLifeMan absolute right-[9px] top-[-265px] m-auto max-h-[456px] max-w-[482px] main:hidden",

  /* user menu */

  userMenu: "userMenu absolute right-0 top-[74px] z-20 flex flex-col justify-center gap-[34px] rounded-[30px] bg-white p-[30px]",
  userMenuEmail: "userMenuEmail text-center text-lg",
  userMenuButtons: "userMenuButtons flex w-full flex-col gap-2.5",

  /* user profile */

  userProfile: "userProfile mt-10 flex flex-col items-center gap-[33px] rounded-[30px] bg-white p-[30px] main:flex-row main:items-start",
  userProfileSection: "userProfileSection mt-6 main:mt-[60px]",
  userProfileTitle: "userProfileTitle mb-6 main:mb-[50px]",
  userProfileLogo: "userProfileLogo h-[197px] w-[197px] rounded-[20px]",
  userProfileRight: "userProfileRight flex w-[283px] flex-col gap-[30px]",
  userProfileName: "userProfileName text-2xl/[26px] main:text-[32px]/9",
  userProfileEmail: "userProfileEmail text-lg [&>span]:font-medium",
  userProfileButtons: "userProfileButtons flex w-full flex-col gap-2.5 main:flex-row",
  userProfileButton: "userProfileButton h-[50px] w-full main:h-13 main:min-w-[192px]",

  /* workout */

  breadcrumbsLine: "breadcrumbsLine mb-6 text-lg/[20px] main:mb-10 main:text-[32px]/9",
  breadcrumb: "breadcrumb underline hover:text-404",
  breadcrumbLast: "breadcrumbLast underline",
  videoText: "videoText relative z-10 mb-[18px] text-2xl/[26px] font-medium main:text-6xl/[66px]",
  videoBlock: "videoBlock h-[189px] overflow-hidden rounded-lg main:h-[639px] main:rounded-[30px]",
  workoutProgressesBlock: "workoutProgressesBlock relative mb-[50px] mt-6 rounded-[30px] bg-white p-[30px] main:mt-10 main:p-10",
  workoutProgresses: "workoutProgresses grid w-full grid-cols-1 gap-x-[60px] gap-y-5 main:grid-cols-3",
  workoutDayCaption: "workoutDayCaption mb-5 text-2xl/[26px] main:text-[32px]/9",
  buttonProgress: "buttonProgress mt-10 h-[50px] w-full main:h-13 main:w-[320px]",
  writeProgressScrollingList: "writeProgressScrollingList max-h-[346px] w-full overflow-y-scroll main:w-[346px]",
  writeProgressScrollingListGapped: "writeProgressScrollingListGapped pr-[26px]",
  writeProgressList: "writeProgressList flex w-full flex-col gap-5 overflow-y-scroll",
  writeProgressItem: "writeProgressItem flex flex-col gap-[10px]",
  writeProgressInput: "writeProgressInput h-13 rounded-lg border border-neutral bg-white px-[18px] py-4",

  /* progress */

  progress: "progress flex flex-col gap-[10px]",
  progressBar: "progressBar relative h-[6px]",
  progressBarBack: "progressBarBack absolute h-[6px] w-full rounded-[50px] bg-light-bg",
  progressBarFront: "progressBarFront absolute h-[6px] w-[120px] rounded-[50px] bg-work",

  /* footer */

  climber: "climber mt-[34px] flex justify-end main:justify-center",
  climberBtn: "climberBtn h-13 w-[127px] main:w-[127px]",
  footer: "footer flex flex-none justify-center pb-[60px] pt-[50px]",
  footerWideText: "footerWideText hidden main:block",
  footerThinText: "footerThinText block main:hidden",

  /* modal: signing */

  modalWrapper: "modalWrapper fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-blocked",
  modalForm: "modalForm m-auto flex w-[360px] flex-col items-center gap-12 rounded-[30px] bg-white p-[30px] main:p-10",
  modalFormCaption: "modalFormCaption text-[32px]/9 main:mb-[14px]",
  modalFormInner: "modalFormInner flex w-full flex-col items-center gap-[34px]",
  modalFormSubgroup: "modalFormSubgroup flex w-full flex-col items-center gap-[10px]",
  modalFormInput: "modalFormInput h-13 w-full rounded-lg border border-neutral bg-white px-4.5 py-4",
  modalFormError: "modalFormError text-center text-sm text-bad",
  modalFormSuggestionLink: "modalFormSuggestionLink text-center text-sm font-medium text-404 underline",
  modalFormErrorLink: "modalFormErrorLink text-center text-sm font-medium text-bad underline",

  /* modal: exercises' list */

  modalFormCompact: "modalFormCompact w-[343px] gap-[34px] main:w-auto",
  modalScrollingList: "modalScrollingList max-h-[364px] w-full overflow-y-scroll",
  modalScrollingListGapped: "modalScrollingListGapped pr-[26px]",
  modalList: "modalList w-full",
  modalListItem: "modalListItem flex cursor-pointer items-center gap-[10px] border-b border-b-delimiter pb-2.5 hover:bg-light-bg [&:not(:first-child)]:pt-2.5",
  modalListMark: "modalListMark h-6 w-6",
  modalListEmptyMark: "modalListEmptyMark m-0.5 h-[20px] min-w-[20px] rounded-[10px] border-2 border-light-tx",
  modalListItemContent: "modalListItemContent flex flex-col gap-[10px]",
  modalListItemExercise: "modalListItemExercise text-lg/[20px] main:text-2xl/[26px]",
  modalListItemCourse: "modalListItemCourse text-sm/[16px] main:text-base/[18px]",

  /* page 404 */

  page404Container: "page404Container relative flex h-screen justify-center bg-white",
  page404Image: "page404Image h-[800px] w-[1200px]",
  page404TextBlock: "page404TextBlock absolute top-[400px] flex w-[700px] flex-col gap-4",
  page404Title: "page404Title text-[28px] text-404",
  page404Description: "page404Description w-[360px] leading-6",
}
