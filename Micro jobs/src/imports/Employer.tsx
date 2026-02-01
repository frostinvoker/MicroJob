import svgPaths from "./svg-at917c2et3";
import imgBigShoesAvatar from "figma:asset/8b9f86452ff0e90495bf9daf1494dd6920ad538a.png";

function Logo1() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Logo">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g clipPath="url(#clip0_1_887)" id="Logo">
          <path clipRule="evenodd" d={svgPaths.pb82c00} fill="var(--fill-0, #4F46E5)" fillRule="evenodd" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p9a9cd00} fill="var(--fill-0, #4F46E5)" fillRule="evenodd" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_1_887">
            <rect fill="white" height="32" width="32" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Logo() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-name="Logo">
      <Logo1 />
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#081021] text-[20px]">Micro Jobs</p>
    </div>
  );
}

function IconSolidChevronLeft() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon/Solid/chevron-left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon/Solid/chevron-left">
          <path clipRule="evenodd" d={svgPaths.pf08ef40} fill="var(--fill-0, #081021)" fillRule="evenodd" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ExpandIcon() {
  return (
    <div className="absolute bg-white content-stretch flex items-center p-[4px] right-[-12px] rounded-[99px] top-[28px]" data-name="Expand icon">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-[-1px] pointer-events-none rounded-[100px]" />
      <IconSolidChevronLeft />
    </div>
  );
}

function Top() {
  return (
    <div className="relative shrink-0 w-full z-[4]" data-name="Top">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center p-[24px] relative w-full">
          <Logo />
          <ExpandIcon />
        </div>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p2fc4f200} id="Icon_2" stroke="var(--stroke-0, #498BC9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Icon() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Icon">
      <Icon1 />
    </div>
  );
}

function Inner() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-start min-h-px min-w-px relative" data-name="Inner">
      <Icon />
      <div className="flex flex-[1_0_0] flex-col font-['Poppins:Medium',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative self-stretch text-[#498bc9] text-[14px]">
        <p className="leading-[20px] whitespace-pre-wrap">Dashboard</p>
      </div>
    </div>
  );
}

function NavItem() {
  return (
    <div className="bg-[#eef2ff] relative rounded-[99px] shrink-0 w-full" data-name="Nav item 1">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-[12px] relative w-full">
          <Inner />
        </div>
      </div>
    </div>
  );
}

function IconOutlineInbox() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon/Outline/inbox">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon/Outline/inbox">
          <path d={svgPaths.p2d9a2480} id="Icon" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Icon2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Icon">
      <IconOutlineInbox />
    </div>
  );
}

function Inner1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-start min-h-px min-w-px relative" data-name="Inner">
      <Icon2 />
      <div className="flex flex-[1_0_0] flex-col font-['Poppins:Medium',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative self-stretch text-[#64748b] text-[14px]">
        <p className="leading-[20px] whitespace-pre-wrap">Find jobs</p>
      </div>
    </div>
  );
}

function NavItem1() {
  return (
    <div className="h-[44px] relative rounded-[99px] shrink-0 w-full" data-name="Nav item 2">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-[12px] relative size-full">
          <Inner1 />
        </div>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p2bff9300} id="Icon_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Icon3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Icon">
      <Icon4 />
    </div>
  );
}

function Badge() {
  return (
    <div className="absolute bg-[#f97316] left-0 rounded-[99px] size-[6px] top-[14px]" data-name="Badge">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none rounded-[100px]" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function Inner2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-start min-h-px min-w-px relative" data-name="Inner">
      <Icon3 />
      <div className="flex flex-[1_0_0] flex-col font-['Poppins:Medium',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative self-stretch text-[#64748b] text-[14px]">
        <p className="leading-[20px] whitespace-pre-wrap">Messages</p>
      </div>
      <Badge />
    </div>
  );
}

function NavItem2() {
  return (
    <div className="h-[44px] relative rounded-[99px] shrink-0 w-full" data-name="Nav item 3">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-[12px] relative size-full">
          <Inner2 />
        </div>
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p1e38c0c0} id="Icon_2" stroke="var(--stroke-0, #64748B)" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Icon5() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Icon">
      <Icon6 />
    </div>
  );
}

function Inner3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-start min-h-px min-w-px relative" data-name="Inner">
      <Icon5 />
      <div className="flex flex-[1_0_0] flex-col font-['Poppins:Medium',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative self-stretch text-[#64748b] text-[14px]">
        <p className="leading-[20px] whitespace-pre-wrap">Saved jobs</p>
      </div>
    </div>
  );
}

function NavItem3() {
  return (
    <div className="h-[44px] relative rounded-[99px] shrink-0 w-full" data-name="Nav item 4">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-[12px] relative size-full">
          <Inner3 />
        </div>
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pa9e5380} id="Icon_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Icon7() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Icon">
      <Icon8 />
    </div>
  );
}

function Inner4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-start min-h-px min-w-px relative" data-name="Inner">
      <Icon7 />
      <div className="flex flex-[1_0_0] flex-col font-['Poppins:Medium',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative self-stretch text-[#64748b] text-[14px]">
        <p className="leading-[20px] whitespace-pre-wrap">E-Wallet</p>
      </div>
    </div>
  );
}

function NavItem4() {
  return (
    <div className="h-[44px] relative rounded-[99px] shrink-0 w-full" data-name="Nav item 5">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-[12px] relative size-full">
          <Inner4 />
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="relative shrink-0 w-full" data-name="Nav">
      <div className="content-stretch flex flex-col gap-[4px] items-start px-[24px] relative w-full">
        <NavItem />
        <NavItem1 />
        <NavItem2 />
        <NavItem3 />
        <NavItem4 />
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p2185fa00} id="Icon_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Icon9() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Icon">
      <Icon10 />
    </div>
  );
}

function Badge1() {
  return (
    <div className="absolute bg-[#f97316] left-0 rounded-[99px] size-[6px] top-[14px]" data-name="Badge">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none rounded-[100px]" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function Inner5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-start min-h-px min-w-px relative" data-name="Inner">
      <Icon9 />
      <div className="flex flex-[1_0_0] flex-col font-['Poppins:Medium',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative self-stretch text-[#64748b] text-[14px]">
        <p className="leading-[20px] whitespace-pre-wrap">Notifications</p>
      </div>
      <Badge1 />
    </div>
  );
}

function NavItem5() {
  return (
    <div className="h-[44px] relative rounded-[99px] shrink-0 w-full" data-name="Nav item 6">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-[12px] relative size-full">
          <Inner5 />
        </div>
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <g id="Icon_2">
            <path d={svgPaths.p7eada00} stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p2d5fa000} stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon11() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Icon">
      <Icon12 />
    </div>
  );
}

function Inner6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-start min-h-px min-w-px relative" data-name="Inner">
      <Icon11 />
      <div className="flex flex-[1_0_0] flex-col font-['Poppins:Medium',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative self-stretch text-[#64748b] text-[14px]">
        <p className="leading-[20px] whitespace-pre-wrap">Settings</p>
      </div>
    </div>
  );
}

function NavItem6() {
  return (
    <div className="h-[44px] relative rounded-[99px] shrink-0 w-full" data-name="Nav item 7">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-[12px] relative size-full">
          <Inner6 />
        </div>
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p26323f00} id="Icon_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Icon13() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Icon">
      <Icon14 />
    </div>
  );
}

function Inner7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-start min-h-px min-w-px relative" data-name="Inner">
      <Icon13 />
      <div className="flex flex-[1_0_0] flex-col font-['Poppins:Medium',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative self-stretch text-[#64748b] text-[14px]">
        <p className="leading-[20px] whitespace-pre-wrap">Support</p>
      </div>
    </div>
  );
}

function NavItem7() {
  return (
    <div className="h-[44px] relative rounded-[99px] shrink-0 w-full" data-name="Nav item 8">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-[12px] relative size-full">
          <Inner7 />
        </div>
      </div>
    </div>
  );
}

function Nav1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Nav 2">
      <div className="content-stretch flex flex-col gap-[4px] items-start px-[24px] relative w-full">
        <NavItem5 />
        <NavItem6 />
        <NavItem7 />
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-center min-h-px min-w-px relative w-full z-[3]" data-name="Main">
      <Nav />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 280 1">
            <line id="Line 1" stroke="var(--stroke-0, #E2E8F0)" x2="280" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Nav1 />
    </div>
  );
}

function UpgradeHero() {
  return (
    <div className="relative shrink-0 w-full z-[2]" data-name="Upgrade Hero">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] w-full" />
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <div className="bg-[#ffb31f] overflow-clip relative rounded-[99px] shrink-0 size-[40px]" data-name="Avatar">
      <div className="absolute inset-[-35%_-40%_-45%_-40%]" data-name="Big Shoes Avatar">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgBigShoesAvatar} />
      </div>
    </div>
  );
}

function TextGroup() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['Poppins:Medium',sans-serif] gap-[2px] items-start leading-[20px] min-h-px min-w-px not-italic relative whitespace-pre-wrap" data-name="Text group">
      <p className="relative shrink-0 text-[#64748b] text-[12px] w-full">Welcome back 👋</p>
      <p className="relative shrink-0 text-[#081021] text-[14px] w-full">Jonas</p>
    </div>
  );
}

function Inner8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative" data-name="Inner">
      <Avatar />
      <TextGroup />
    </div>
  );
}

function Caret() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Caret">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Caret">
          <path clipRule="evenodd" d={svgPaths.p3efe8e00} fill="var(--fill-0, #081021)" fillRule="evenodd" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Footer() {
  return (
    <div className="relative shrink-0 w-full z-[1]" data-name="Footer">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-solid border-t inset-[-1px_0_0_0] pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center p-[24px] relative w-full">
          <Inner8 />
          <Caret />
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[24px] h-[852px] isolate items-center left-0 rounded-[16px] shadow-[0px_16px_44px_0px_rgba(0,0,0,0.07)] top-0 w-[280px]" data-name="Sidebar">
      <Top />
      <Main />
      <UpgradeHero />
      <Footer />
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p2bff9300} id="Icon_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Icon15() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Icon">
      <Icon16 />
    </div>
  );
}

function Badge2() {
  return (
    <div className="absolute bg-[#f97316] left-0 rounded-[99px] size-[6px] top-[14px]" data-name="Badge">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none rounded-[100px]" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function Inner9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-start min-h-px min-w-px relative" data-name="Inner">
      <Icon15 />
      <div className="flex flex-[1_0_0] flex-col font-['Poppins:Medium',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative self-stretch text-[#64748b] text-[14px]">
        <p className="leading-[20px] whitespace-pre-wrap">Messages</p>
      </div>
      <Badge2 />
    </div>
  );
}

function NavItem8() {
  return (
    <div className="absolute content-stretch flex h-[44px] items-center left-[24px] overflow-clip px-[16px] py-[12px] rounded-[99px] top-[340px] w-[232px]" data-name="Nav item 3">
      <Inner9 />
    </div>
  );
}

function IconOutlineInbox1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon/Outline/inbox">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon/Outline/inbox">
          <path d={svgPaths.p2d9a2480} id="Icon" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Icon17() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Icon">
      <IconOutlineInbox1 />
    </div>
  );
}

function Inner10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-start min-h-px min-w-px relative" data-name="Inner">
      <Icon17 />
      <div className="flex flex-[1_0_0] flex-col font-['Poppins:Medium',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative self-stretch text-[#64748b] text-[14px]">
        <p className="leading-[20px] whitespace-pre-wrap">Find jobs</p>
      </div>
    </div>
  );
}

function NavItem9() {
  return (
    <div className="absolute content-stretch flex h-[44px] items-center left-[24px] overflow-clip px-[16px] py-[12px] rounded-[99px] top-[152px] w-[232px]" data-name="Nav item 2">
      <Inner10 />
    </div>
  );
}

function Card() {
  return (
    <div className="absolute contents left-[305px] top-[310px]" data-name="Card">
      <div className="absolute bg-white h-[153px] left-[305px] rounded-[15px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)] top-[310px] w-[479px]" />
      <p className="absolute font-['Roboto_Serif:SemiBold',sans-serif] font-semibold h-[19px] leading-[1.4] left-[317px] text-[13px] text-black top-[318px] tracking-[0.2px] w-[115px] whitespace-pre-wrap" style={{ fontVariationSettings: "'GRAD' 0, 'wdth' 100" }}>
        Jonas Enriquez
      </p>
      <p className="absolute font-['Roboto_Serif:SemiBold',sans-serif] font-semibold h-[19px] leading-[1.4] left-[317px] text-[10px] text-black top-[333px] tracking-[0.2px] w-[191px] whitespace-pre-wrap" style={{ fontVariationSettings: "'GRAD' 0, 'wdth' 100" }}>
        enriquezjonas@gmail.com
      </p>
      <div className="absolute font-['Roboto_Serif:SemiBold',sans-serif] font-semibold h-[10px] leading-[1.4] left-[317px] text-[8px] text-black top-[348px] tracking-[0.2px] w-[210px] whitespace-pre-wrap" style={{ fontVariationSettings: "'GRAD' 0, 'wdth' 100" }}>
        <p className="mb-0">Applied for: Backend Engineer at CloudScale</p>
        <p>&nbsp;</p>
      </div>
      <div className="absolute font-['Roboto_Serif:SemiBold',sans-serif] font-semibold h-[10px] leading-[1.4] left-[317px] text-[#4b5563] text-[8px] top-[376px] tracking-[0.2px] w-[364px] whitespace-pre-wrap" style={{ fontVariationSettings: "'GRAD' 0, 'wdth' 100" }}>
        <p className="mb-0">Cover letter: I am a backend engineer with 5 years of experience building scalable distributed systems. I have extensive experience with Node.js, Python, and cloud infrastructure.</p>
        <p>&nbsp;</p>
      </div>
      <p className="absolute font-['Roboto_Serif:SemiBold',sans-serif] font-semibold h-[14px] leading-[1.4] left-[317px] text-[#808080] text-[10px] top-[441px] tracking-[0.2px] w-[95px] whitespace-pre-wrap" style={{ fontVariationSettings: "'GRAD' 0, 'wdth' 100" }}>
        about 1 year ago
        <br aria-hidden="true" />
        <br aria-hidden="true" />
      </p>
      <p className="absolute font-['Roboto_Serif:SemiBold',sans-serif] font-semibold h-[14px] leading-[1.4] left-[calc(13.33%+252.2px)] text-[#498bc9] text-[10px] top-[441px] tracking-[0.2px] w-[107px] whitespace-pre-wrap" style={{ fontVariationSettings: "'GRAD' 0, 'wdth' 100" }}>
        View Resume/CV
      </p>
      <div className="absolute bg-[rgba(5,223,114,0.2)] h-[17px] left-[calc(53.33%-14.2px)] rounded-[15px] top-[321px] w-[69px]" />
      <p className="absolute font-['Roboto_Serif:SemiBold',sans-serif] font-semibold h-[12px] leading-[1.4] left-[calc(53.33%-0.2px)] text-[#41d741] text-[8px] top-[324px] tracking-[0.2px] w-[47px] whitespace-pre-wrap" style={{ fontVariationSettings: "'GRAD' 0, 'wdth' 100" }}>
        Accepted
      </p>
      <div className="absolute bg-[#d9d9d9] h-[25px] left-[calc(46.67%+44.2px)] rounded-[5px] top-[426px] w-[100px]" />
      <p className="absolute font-['Roboto_Serif:SemiBold',sans-serif] font-semibold h-[13px] leading-[1.4] left-[calc(53.33%-21.2px)] text-[9px] text-black top-[431px] tracking-[0.2px] w-[51px] whitespace-pre-wrap" style={{ fontVariationSettings: "'GRAD' 0, 'wdth' 100" }}>
        Accepted
      </p>
    </div>
  );
}

export default function Employer() {
  return (
    <div className="bg-[#f8f8f8] relative size-full" data-name="Employer">
      <p className="absolute font-['Poppins:Regular',sans-serif] h-[25px] leading-[normal] left-[calc(66.67%-98.84px)] not-italic text-[20px] text-white top-[845.62px] w-[52px] whitespace-pre-wrap">Update</p>
      <Sidebar />
      <NavItem8 />
      <NavItem9 />
      <p className="absolute font-['Poppins:Light',sans-serif] h-[11px] leading-[normal] left-[calc(100%+86px)] not-italic text-[#838383] text-[7.82px] top-[612px] w-[145px] whitespace-pre-wrap">{`(including HR & Technical interviews)`}</p>
      <p className="absolute font-['Roboto_Serif:Bold',sans-serif] font-bold h-[30px] leading-[1.4] left-[300px] text-[20px] text-black top-[36px] tracking-[0.2px] w-[223px] whitespace-pre-wrap" style={{ fontVariationSettings: "'GRAD' 0, 'wdth' 100" }}>
        Employer Dashboard
      </p>
      <div className="absolute bg-[#d9d9d9] h-[87px] left-[300px] rounded-[15px] top-[861px] w-[479px]" />
      <div className="absolute bg-[#d9d9d9] h-[87px] left-[calc(66.67%-78px)] rounded-[15px] top-[861px] w-[479px]" />
      <Card />
    </div>
  );
}