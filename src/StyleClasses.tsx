// @ts-nocheck
// there is special file to get sharedStyles.ts
// you can use `npm run prebuild` + `npm run dev`

import { sharedStyles } from "./sharedStyles"

function StyleClasses() {
  return (
    <>
      {/* common */}
      <shadowedBlock className="shadow-3xl" />
      <scaledBlock className="duration-300 hover:scale-102" />
      <hiddenBlock className="main:hidden" />
      <text_18_20 className="text-lg/5" />
      {/* courses */}
      <colors className="bg-aerobics bg-body-flex bg-stretching bg-yoga bg-zumba" />
      {/* button */}
      <buttonCommon className="h-9 w-[83px] rounded-[46px] duration-300 main:h-13 main:w-[103px]" />
      <buttonPrimary className="bg-good hover:bg-well active:bg-black active:text-white disabled:bg-light-bg disabled:text-light-tx" />
      <buttonSecondary className="border border-black bg-white hover:bg-light-bg active:bg-dark disabled:text-light-tx" />
      <buttonWide className="h-[50px] w-full main:h-13 main:w-full" />
      <buttonWideWithFields className="h-[50px] w-full text-nowrap px-11 main:h-13 main:w-full" />
      <buttonWideWithMargin className="mt-7 h-[50px] w-full main:mt-10 main:h-13 main:w-full" />
      {/* main */}
      <wrapper className="flex h-[100vh] flex-col justify-between" />
      <container className="m-auto w-[343px] flex-1 main:w-[1160px]" />
      {/* header */}
      <header className="flex w-full justify-between py-10 main:pb-[60px] main:pt-[50px]" />
      <headerContainer className="flex w-1/2 flex-col justify-start gap-[15px] text-left" />
      <headerLogo className="h-[35px] w-[220px]" />
      <headerSlogan className="hidden main:block" />
      <headerUserGroup className="relative flex h-9 items-center gap-4 main:h-[50px]" />
      <headerProfileBlock className="group/profile hidden items-center gap-3 main:flex" />
      <headerProfileBlockSmall className="group/profile flex items-center gap-3 main:hidden" />
      <headerProfileLogo className="h-9 w-9 main:h-[50px] main:w-[50px]" />
      <headerProfileName className="text-2xl/[26px] hover:underline group-hover/profile:text-404" />
      <headerProfileNameBtn className="mr-px h-2 w-2 rotate-45 border-b-2 border-r-2 group-hover/profile:border-404" />
      <headerProfileNameBtnReversed className="rotate-225" />
      {/* caption */}
      <caption className="flex justify-between text-left" />
      <captionText className="mb-[34px] max-w-[864px] text-[32px]/9 font-medium main:mb-[50px] main:text-6xl" />
      <captionBalloon className="relative hidden main:block" />
      <captionBalloonTail className="absolute right-[140px] top-[85px] h-9 w-[30px]" />
      <captionBalloonFace className="relative z-10 h-[102px] w-[288px] rounded-[5px] bg-good px-5 py-4 text-[32px]/9" />
      {/* banner */}
      <banner className="relative mb-[40px] h-[389px] w-[343px] overflow-hidden rounded-[30px] p-10 text-white main:mb-[60px] main:h-[310px] main:w-[1160px]" />
      <bannerText className="relative z-10 mb-[18px] hidden text-6xl/[66px] font-medium main:block" />
      <bannerPicture className="absolute" />
      <banner-yoga className="top-[-55px] main:right-[-295px] main:top-[-175px] main:w-[80%]" />
      <banner-stretching className="main:right-[-10px] main:top-0 main:w-[30%]" />
      <banner-zumba className="main:right-[-271px] main:top-[-37px] main:w-[78%]" />
      <banner-aerobics className="top-[-651px] main:right-0 main:top-[-315px] main:w-[40%]" />
      <banner-body-flex className="top-[-113px] main:right-[-200px] main:top-[-155px] main:w-[70%]" />
      {/* card */}
      <cards className="flex w-full flex-wrap justify-start gap-6 main:gap-10" />
      <card className="relative w-[343px] rounded-[30px] bg-white hover:z-40 main:w-[360px]" />
      <cardPicture className="relative h-[325px] w-[343px] overflow-hidden rounded-[30px] main:w-[360px]" />
      <cardInner className="absolute" />
      <card-yoga className="right-[-232px] top-[-119px] min-h-[557px] min-w-[834px]" />
      <card-stretching className="right-0 top-0 min-h-[540px] min-w-[360px]" />
      <card-zumba className="-top-8 right-[-398px] min-h-[767px] min-w-[1150px]" />
      <card-aerobics className="right-[-82px] top-[-715px] min-h-[1081px] min-w-[721px]" />
      <card-body-flex className="right-[-182px] top-[-168px] min-h-[514px] min-w-[771px]" />
      <cardAction className="group/card absolute h-8 w-8" />
      <cardAddBtn className="absolute left-[291px] top-[-305px] h-8 w-8 cursor-arrow duration-300 hover:scale-110 main:left-[308px]" />
      <cardActionTooltip className="absolute left-[352px] top-[-262px] hidden h-[27px] w-max items-center justify-center rounded-[5px] border border-black bg-white p-1.5 text-sm main:group-hover/card:flex" />
      <cardBlock className="mx-auto flex w-[300px] flex-col gap-10 pb-[15px] pt-6" />
      <cardContent className="flex flex-col gap-5" />
      <cardTitle className="text-2xl/[26px] font-medium main:text-[32px]/9" />
      <cardTablets className="flex flex-wrap gap-[6px]" />
      <cardTablet className="flex h-[38px] gap-[6px] rounded-[50px] bg-light-bg p-[10px]" />
      <cardTabletText className="text-nowrap text-base/[18px]" />
      {/* presentation */}
      <presentation className="my-[40px] main:my-[60px]" />
      <presentationTitle className="mb-6 text-2xl/[26px] font-medium main:mb-10 main:text-[40px]/[44px]" />
      <presentationContent className="flex flex-col justify-between gap-[17px] text-left main:flex-row" />
      <presentationBlock className="flex h-[141px] items-center gap-[25px] rounded-[28px] bg-black px-5" />
      <presentationNumber className="text-[75px]/[102px] font-medium text-good" />
      <presentationText className="text-lg/5 text-white main:text-2xl/[30px]" />
      <presentationGoals className="flex flex-wrap gap-x-31 gap-y-6 rounded-[28px] bg-good p-[30px] text-lg/5 main:gap-y-[34px] main:text-2xl/[26px]" />
      <presentationGoal className="flex h-13/2 w-[284px] items-center gap-2" />
      <presentationGoalStar className="h-13/2 w-[26px]" />
      <presentationNewLifeSection className="relative mx-auto mt-[116px] w-[482px] main:mt-[42px] main:w-[1160px]" />
      <presentationNewLife className="presentationNewLife relative z-10 m-auto w-[343px] rounded-[30px] bg-white p-[30px] main:z-0 main:mt-0 main:w-[1160px] main:p-10" />
      <presentationNewLifeTitle className="mb-9 text-[32px]/9 font-medium main:mb-10 main:text-6xl" />
      <presentationNewLifeLeft className="relative z-10 list-inside main:w-[448px]" />
      <presentationNewLifeLeftItem className="list-disc text-lg opacity-60 main:text-2xl" />
      <presentationNewLifeRight className="absolute bottom-0 right-0 hidden h-full w-full overflow-hidden main:block" />
      <presentationNewLifeLines className="absolute bottom-[-58px] right-[30px] h-[530px] w-[635px]" />
      <presentationNewLifeMan className="absolute bottom-[9px] right-[9px] hidden h-[570px] w-[550px] main:block" />
      <presentationNewLifeManSmall className="presentationNewLifeMan absolute right-[9px] top-[-265px] m-auto max-h-[456px] max-w-[482px] main:hidden" />
      {/* user menu */}
      <userMenu className="absolute right-0 top-[74px] z-20 flex flex-col justify-center gap-[34px] rounded-[30px] bg-white p-[30px]" />
      <userMenuEmail className="text-center text-lg" />
      <userMenuButtons className="flex w-full flex-col gap-2.5" />
      {/* user profile */}
      <userProfile className="mt-10 flex flex-col items-center gap-[33px] rounded-[30px] bg-white p-[30px] main:flex-row main:items-start" />
      <userProfileSection className="mt-6 main:mt-[60px]" />
      <userProfileTitle className="mb-6 main:mb-[50px]" />
      <userProfileLogo className="h-[197px] w-[197px] rounded-[20px]" />
      <userProfileRight className="flex w-[283px] flex-col gap-[30px]" />
      <userProfileName className="text-2xl/[26px] main:text-[32px]/9" />
      <userProfileEmail className="text-lg [&>span]:font-medium" />
      <userProfileButtons className="flex w-full flex-col gap-2.5 main:flex-row" />
      <userProfileButton className="h-[50px] w-full main:h-13 main:min-w-[192px]" />
      {/* workout */}
      <breadcrumbsLine className="mb-6 text-lg/[20px] main:mb-10 main:text-[32px]/9" />
      <breadcrumb className="underline hover:text-404" />
      <breadcrumbLast className="underline" />
      <videoText className="relative z-10 mb-[18px] text-2xl/[26px] font-medium main:text-6xl/[66px]" />
      <videoBlock className="h-[189px] overflow-hidden rounded-lg main:h-[639px] main:rounded-[30px]" />
      <workoutProgressesBlock className="relative mb-[50px] mt-6 rounded-[30px] bg-white p-[30px] main:mt-10 main:p-10" />
      <workoutProgresses className="grid w-full grid-cols-1 gap-x-[60px] gap-y-5 main:grid-cols-3" />
      <workoutDayCaption className="mb-5 text-2xl/[26px] main:text-[32px]/9" />
      <buttonProgress className="mt-10 h-[50px] w-full main:h-13 main:w-[320px]" />
      <writeProgressScrollingList className="max-h-[346px] w-full overflow-y-scroll main:w-[346px]" />
      <writeProgressScrollingListGapped className="pr-[26px]" />
      <writeProgressList className="flex w-full flex-col gap-5 overflow-y-scroll" />
      <writeProgressItem className="flex flex-col gap-[10px]" />
      <writeProgressInput className="h-13 rounded-lg border border-neutral bg-white px-[18px] py-4" />
      {/* progress */}
      <progress className="flex flex-col gap-[10px]" />
      <progressText className="" />
      <progressBar className="relative h-[6px]" />
      <progressBarBack className="absolute h-[6px] w-full rounded-[50px] bg-light-bg" />
      <progressBarFront className="absolute h-[6px] w-[120px] rounded-[50px] bg-work" />
      {/* footer */}
      <climber className="mt-[34px] flex justify-end main:justify-center" />
      <climberBtn className="h-13 w-[127px] main:w-[127px]" />
      <footer className="flex flex-none justify-center pb-[60px] pt-[50px]" />
      <footerWideText className="hidden main:block" />
      <footerThinText className="block main:hidden" />
      {/* modal: signing */}
      <modalWrapper className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-blocked" />
      <modalForm className="m-auto flex w-[360px] flex-col items-center gap-12 rounded-[30px] bg-white p-[30px] main:p-10" />
      <modalFormCaption className="text-[32px]/9 main:mb-[14px]" />
      <modalFormInner className="flex w-full flex-col items-center gap-[34px]" />
      <modalFormSubgroup className="flex w-full flex-col items-center gap-[10px]" />
      <modalFormInput className="h-13 w-full rounded-lg border border-neutral bg-white px-4.5 py-4" />
      <modalFormError className="text-center text-sm text-bad" />
      <modalFormSuggestionLink className="text-center text-sm font-medium text-404 underline" />
      <modalFormErrorLink className="text-center text-sm font-medium text-bad underline" />
      {/* modal: exercises' list */}
      <modalFormCompact className="w-[343px] gap-[34px] main:w-auto" />
      <modalScrollingList className="max-h-[364px] w-full overflow-y-scroll" />
      <modalScrollingListGapped className="pr-[26px]" />
      <modalList className="w-full" />
      <modalListItem className="flex cursor-pointer items-center gap-[10px] border-b border-b-delimiter pb-2.5 hover:bg-light-bg [&:not(:first-child)]:pt-2.5" />
      <modalListMark className="h-6 w-6" />
      <modalListEmptyMark className="m-0.5 h-[20px] min-w-[20px] rounded-[10px] border-2 border-light-tx" />
      <modalListItemContent className="flex flex-col gap-[10px]" />
      <modalListItemExercise className="text-lg/[20px] main:text-2xl/[26px]" />
      <modalListItemCourse className="text-sm/[16px] main:text-base/[18px]" />
      {/* page 404 */}
      <page404Container className="relative flex h-screen justify-center bg-white" />
      <page404Image className="h-[800px] w-[1200px]" />
      <page404TextBlock className="absolute top-[400px] flex w-[700px] flex-col gap-4" />
      <page404Title className="text-[28px] text-404" />
      <page404Description className="w-[360px] leading-6" />
    </>
  )
}
