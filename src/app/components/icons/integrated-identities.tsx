import type { FC } from 'react'

import type { IconProps } from '@/types/icon-props'

export const IntegratedIdentitiesIcon: FC<IconProps> = (props) => {
  return (
    <svg
      version="1.1"
      className="rounded-lg"
      xmlns="http://www.w3.org/2000/svg"
      width={props.size ?? 40}
      height={props.size ?? 40}
      viewBox="0 0 1080 1080"
      {...props}
    >
      <path
        d="M0 0 C356.4 0 712.8 0 1080 0 C1080 356.4 1080 712.8 1080 1080 C723.6 1080 367.2 1080 0 1080 C0 723.6 0 367.2 0 0 Z "
        fill="var(--logo-bg-color)"
        transform="translate(0,0)"
      />
      <path
        d="M0 0 C2.02274667 0.00320016 4.04407856 -0.02057002 6.06665039 -0.0456543 C13.38851031 -0.04926646 19.44693559 0.43480412 26.19360352 3.31567383 C27.36922852 3.70754883 28.54485352 4.09942383 29.75610352 4.50317383 C30.96266602 4.90536133 30.96266602 4.90536133 32.19360352 5.31567383 C32.19360352 5.97567383 32.19360352 6.63567383 32.19360352 7.31567383 C32.90645508 7.57219727 33.61930664 7.8287207 34.35375977 8.09301758 C43.15566228 11.88255745 49.67646639 17.94244403 54.19360352 26.31567383 C54.7543457 27.26313477 54.7543457 27.26313477 55.32641602 28.22973633 C57.94364901 34.52524271 56.71581153 43.41228246 54.55297852 49.73754883 C47.52582631 63.06490645 34.24337836 70.55011919 20.31860352 74.90161133 C11.07764377 76.70223951 2.45388575 75.69116986 -5.80639648 71.31567383 C-6.64944336 70.89157227 -7.49249023 70.4674707 -8.36108398 70.03051758 C-17.60389919 64.98770503 -24.86129619 57.15053565 -28.80639648 47.31567383 C-29.43055916 43.55534114 -29.42029164 39.93071898 -29.30639648 36.12817383 C-29.30897461 35.16975586 -29.31155273 34.21133789 -29.31420898 33.22387695 C-29.23982581 27.84225454 -28.75969652 23.98911404 -25.80639648 19.31567383 C-30.75639648 19.81067383 -30.75639648 19.81067383 -35.80639648 20.31567383 C-35.80639648 20.97567383 -35.80639648 21.63567383 -35.80639648 22.31567383 C-36.89952148 22.66629883 -37.99264648 23.01692383 -39.11889648 23.37817383 C-59.6351741 31.14401835 -76.83239744 50.0011912 -86.00952148 69.52270508 C-86.27249023 70.11438477 -86.53545898 70.70606445 -86.80639648 71.31567383 C-87.32202148 72.47067383 -87.83764648 73.62567383 -88.36889648 74.81567383 C-89.08045898 76.54817383 -89.08045898 76.54817383 -89.80639648 78.31567383 C-90.51795898 80.04817383 -90.51795898 80.04817383 -91.24389648 81.81567383 C-96.19845644 95.41545172 -98.3008961 109.50398282 -100.43139648 123.75317383 C-100.73277231 125.71747522 -101.03485235 127.68166869 -101.33764648 129.64575195 C-102.82279985 139.34749317 -104.18390498 149.05204388 -105.36352539 158.79541016 C-106.02198855 164.0293574 -106.8478835 169.23227761 -107.68139648 174.44067383 C-110.79611722 194.3822674 -113.71411395 214.35187977 -115.21118164 234.48828125 C-115.31052002 235.80276245 -115.31052002 235.80276245 -115.41186523 237.14379883 C-115.4649585 237.90595703 -115.51805176 238.66811523 -115.57275391 239.45336914 C-115.80639648 241.31567383 -115.80639648 241.31567383 -116.80639648 243.31567383 C-117.01893274 245.62571413 -117.17596784 247.94095266 -117.30639648 250.25708008 C-117.34700195 250.9399559 -117.38760742 251.62283173 -117.42944336 252.32640076 C-117.6033692 255.25238939 -117.76715321 258.17892299 -117.93139648 261.10546875 C-118.05262845 263.23957762 -118.17933936 265.37331141 -118.30639648 267.50708008 C-118.37858398 268.78784424 -118.45077148 270.0686084 -118.52514648 271.38818359 C-118.80639648 274.31567383 -118.80639648 274.31567383 -119.80639648 275.31567383 C-120.10910739 277.97622335 -120.35406558 280.61982024 -120.56030273 283.28833008 C-120.62547592 284.08597275 -120.69064911 284.88361542 -120.75779724 285.70542908 C-120.96575539 288.26268713 -121.16738944 290.82040013 -121.36889648 293.37817383 C-121.50845539 295.10802507 -121.64842395 296.83784332 -121.78881836 298.56762695 C-122.1327724 302.81660706 -122.47105411 307.06600574 -122.80639648 311.31567383 C-123.46639648 311.31567383 -124.12639648 311.31567383 -124.80639648 311.31567383 C-124.78319336 312.01305664 -124.75999023 312.71043945 -124.73608398 313.42895508 C-124.51377488 326.43403783 -125.75255427 339.36406516 -126.80639648 352.31567383 C-127.46639648 352.31567383 -128.12639648 352.31567383 -128.80639648 352.31567383 C-128.86698242 353.43586914 -128.92756836 354.55606445 -128.98999023 355.71020508 C-129.07441073 357.18287366 -129.15905798 358.65552926 -129.24389648 360.12817383 C-129.28321289 360.86616211 -129.3225293 361.60415039 -129.36303711 362.36450195 C-129.55020683 365.54638725 -129.79360441 368.27729761 -130.80639648 371.31567383 C-131.09706323 374.0400587 -131.34645489 376.75316876 -131.56030273 379.48364258 C-131.62547592 380.27845535 -131.69064911 381.07326813 -131.75779724 381.89216614 C-131.96499606 384.42889857 -132.16700873 386.96601373 -132.36889648 389.50317383 C-132.5085289 391.2239047 -132.64849878 392.94460823 -132.78881836 394.6652832 C-133.13192662 398.88177281 -133.47038452 403.09861302 -133.80639648 407.31567383 C-134.46639648 407.31567383 -135.12639648 407.31567383 -135.80639648 407.31567383 C-135.79479492 408.0659082 -135.78319336 408.81614258 -135.77124023 409.58911133 C-135.71308406 416.18568338 -135.69862155 422.79211034 -136.80639648 429.31567383 C-137.13639648 429.64567383 -137.46639648 429.97567383 -137.80639648 430.31567383 C-138.15436246 432.32891907 -138.4436642 434.35234772 -138.70874023 436.37817383 C-138.87591553 437.64298584 -139.04309082 438.90779785 -139.21533203 440.2109375 C-139.39162965 441.57916884 -139.56781584 442.94741455 -139.74389648 444.31567383 C-139.92436026 445.69241976 -140.10510579 447.06912879 -140.28613281 448.44580078 C-141.41503164 457.07371737 -142.4740267 465.70773948 -143.41186523 474.35864258 C-143.80639648 477.31567383 -143.80639648 477.31567383 -144.80639648 480.31567383 C-145.11658047 483.27510099 -145.39281892 486.23057713 -145.65014648 489.19458008 C-146.5779973 499.10267717 -148.08001442 508.84822792 -149.83813477 518.63964844 C-150.31528782 521.30279935 -150.77827804 523.96816613 -151.23999023 526.6340332 C-151.54256027 528.349672 -151.84591491 530.06517264 -152.15014648 531.78051758 C-152.28666626 532.56692123 -152.42318604 533.35332489 -152.56384277 534.16355896 C-153.28114549 538.11643246 -154.20182445 541.60959765 -155.80639648 545.31567383 C-156.26728194 547.57794696 -156.67802146 549.85064721 -157.05639648 552.12817383 C-158.34846583 559.45136308 -160.0192592 566.66093092 -161.80639648 573.87817383 C-162.05550781 574.90080322 -162.30461914 575.92343262 -162.5612793 576.97705078 C-163.91358785 582.36280126 -165.53819946 587.25535821 -167.80639648 592.31567383 C-168.25585842 593.94767731 -168.66191807 595.59328175 -168.99389648 597.25317383 C-169.15245117 598.02532227 -169.31100586 598.7974707 -169.47436523 599.59301758 C-169.58393555 600.16149414 -169.69350586 600.7299707 -169.80639648 601.31567383 C-170.46639648 601.31567383 -171.12639648 601.31567383 -171.80639648 601.31567383 C-171.90952148 602.14067383 -172.01264648 602.96567383 -172.11889648 603.81567383 C-172.92285704 607.90856395 -174.26991806 611.44107607 -175.80639648 615.31567383 C-176.46639648 615.31567383 -177.12639648 615.31567383 -177.80639648 615.31567383 C-177.92885742 616.0452832 -178.05131836 616.77489258 -178.17749023 617.52661133 C-183.65945058 641.83791375 -211.25115997 664.14363738 -230.80639648 677.31567383 C-245.17580335 686.31567383 -245.17580335 686.31567383 -248.80639648 686.31567383 C-248.80639648 686.97567383 -248.80639648 687.63567383 -248.80639648 688.31567383 C-268.73839357 695.74409948 -268.73839357 695.74409948 -278.80639648 695.31567383 C-278.80639648 695.97567383 -278.80639648 696.63567383 -278.80639648 697.31567383 C-325.39535834 698.97930416 -325.39535834 698.97930416 -341.82592773 684.35864258 C-347.98709031 678.00304489 -353.14034063 671.27901666 -353.22460938 662.14990234 C-353.20321899 661.05633423 -353.20321899 661.05633423 -353.18139648 659.94067383 C-353.16906982 659.18262451 -353.15674316 658.4245752 -353.14404297 657.64355469 C-352.8121051 646.6229794 -348.81666219 640.95366757 -340.80639648 633.31567383 C-331.67590908 625.37837512 -318.8614164 621.34413867 -306.86108398 621.90161133 C-293.90196689 623.65821799 -282.10316647 631.38407232 -273.80639648 641.31567383 C-268.55561655 649.54189573 -267.82016998 659.79744132 -268.80639648 669.31567383 C-269.837745 672.82225877 -271.1583148 676.056298 -272.80639648 679.31567383 C-265.11086502 676.52054262 -257.76907332 673.64669484 -250.80639648 669.31567383 C-249.86022461 668.72915039 -248.91405273 668.14262695 -247.93920898 667.53833008 C-233.42460274 658.2127879 -222.59119307 646.80702784 -214.80639648 631.31567383 C-214.14639648 631.31567383 -213.48639648 631.31567383 -212.80639648 631.31567383 C-212.43514648 629.61411133 -212.43514648 629.61411133 -212.05639648 627.87817383 C-211.27794298 624.73123413 -210.24961736 621.93389937 -208.86889648 619.00317383 C-206.50913389 613.94780227 -205.13949839 608.71877623 -203.80639648 603.31567383 C-203.14639648 603.31567383 -202.48639648 603.31567383 -201.80639648 603.31567383 C-201.74581055 602.64922852 -201.68522461 601.9827832 -201.62280273 601.29614258 C-201.44617826 599.35327335 -201.26765194 597.41057647 -201.08764648 595.46801758 C-200.90676076 593.44059013 -200.73900645 591.41192536 -200.58764648 589.38208008 C-200.0953636 583.04393788 -198.88355705 577.48659227 -196.83374023 571.45239258 C-195.21227615 565.73622333 -194.88571716 559.77005607 -194.30639648 553.87817383 C-193.57915271 546.50583991 -192.77645737 539.4621295 -190.80639648 532.31567383 C-188.57973033 520.4236272 -187.34069458 508.31179412 -185.80639648 496.31567383 C-185.14639648 496.31567383 -184.48639648 496.31567383 -183.80639648 496.31567383 C-183.8624707 494.4690918 -183.8624707 494.4690918 -183.91967773 492.58520508 C-183.91619028 486.62049438 -182.94547881 480.8784024 -181.99389648 475.00317383 C-178.28274069 450.76870081 -176.36197464 426.72714691 -175.34292603 402.25279236 C-175.30766815 401.40729324 -175.27241028 400.56179413 -175.23608398 399.69067383 C-175.20187347 398.86769302 -175.16766296 398.04471222 -175.13241577 397.1967926 C-174.85862353 390.88711874 -174.42129882 384.60205202 -173.80639648 378.31567383 C-173.14639648 378.31567383 -172.48639648 378.31567383 -171.80639648 378.31567383 C-171.80639648 373.36567383 -171.80639648 368.41567383 -171.80639648 363.31567383 C-171.14639648 363.31567383 -170.48639648 363.31567383 -169.80639648 363.31567383 C-169.78657715 362.44467041 -169.76675781 361.57366699 -169.74633789 360.67626953 C-169.66725407 357.37899842 -169.58054325 354.0820968 -169.48901367 350.78515625 C-169.45122595 349.3705186 -169.41629582 347.95580111 -169.38452148 346.54101562 C-169.20087234 338.45758366 -168.68773498 330.60167624 -167.32788086 322.61376953 C-166.33935845 316.36192066 -165.83246427 310.053029 -165.24389648 303.75317383 C-164.9961599 301.10566793 -164.74416782 298.45867444 -164.48999023 295.81176758 C-164.38227295 294.65862061 -164.27455566 293.50547363 -164.16357422 292.31738281 C-163.87250724 289.87126628 -163.40128614 287.69197682 -162.80639648 285.31567383 C-162.59564814 283.36577543 -162.4208986 281.41183481 -162.27124023 279.45629883 C-162.14072266 277.78374023 -162.14072266 277.78374023 -162.00756836 276.07739258 C-161.87705078 274.3390918 -161.87705078 274.3390918 -161.74389648 272.56567383 C-161.65301758 271.39133789 -161.56213867 270.21700195 -161.46850586 269.00708008 C-161.24476034 266.11016434 -161.02417469 263.21304326 -160.80639648 260.31567383 C-160.14639648 260.31567383 -159.48639648 260.31567383 -158.80639648 260.31567383 C-158.82234863 259.74171875 -158.83830078 259.16776367 -158.85473633 258.57641602 C-158.96298442 251.48265151 -158.29581428 244.60045926 -157.43139648 237.56567383 C-157.2255896 235.84477539 -157.2255896 235.84477539 -157.015625 234.08911133 C-154.52513647 213.47575408 -154.52513647 213.47575408 -152.80639648 205.62817383 C-151.5789024 199.87429533 -151.10484804 194.03153901 -150.59155273 188.17822266 C-150.51807617 187.39471436 -150.44459961 186.61120605 -150.36889648 185.80395508 C-150.30831055 185.10826416 -150.24772461 184.41257324 -150.18530273 183.69580078 C-149.67391529 180.48348365 -148.70282555 177.44124271 -147.80639648 174.31567383 C-147.34496942 172.05238231 -146.91576089 169.78230742 -146.51733398 167.50708008 C-146.29819336 166.26635742 -146.07905273 165.02563477 -145.85327148 163.74731445 C-145.63155273 162.47049805 -145.40983398 161.19368164 -145.18139648 159.87817383 C-144.94996508 158.56105685 -144.71819715 157.24399896 -144.48608398 155.92700195 C-143.92288194 152.72379031 -143.3630934 149.52002129 -142.80639648 146.31567383 C-142.14639648 146.31567383 -141.48639648 146.31567383 -140.80639648 146.31567383 C-140.68393555 145.37594727 -140.56147461 144.4362207 -140.43530273 143.46801758 C-139.73504564 138.56621792 -138.73213414 133.72856997 -137.74389648 128.87817383 C-137.55762695 127.95584961 -137.37135742 127.03352539 -137.17944336 126.08325195 C-136.72352278 123.8270296 -136.26580009 121.57118909 -135.80639648 119.31567383 C-135.14639648 119.31567383 -134.48639648 119.31567383 -133.80639648 119.31567383 C-133.68393555 118.66211914 -133.56147461 118.00856445 -133.43530273 117.33520508 C-132.64270617 113.52975699 -131.69683282 109.77114471 -130.74389648 106.00317383 C-130.55762695 105.26260742 -130.37135742 104.52204102 -130.17944336 103.7590332 C-129.72283544 101.94430941 -129.26476342 100.12995412 -128.80639648 98.31567383 C-128.14639648 98.31567383 -127.48639648 98.31567383 -126.80639648 98.31567383 C-126.74323242 97.69563477 -126.68006836 97.0755957 -126.61499023 96.43676758 C-125.38557279 87.54613827 -121.80480339 80.23765115 -117.80639648 72.31567383 C-117.14639648 72.31567383 -116.48639648 72.31567383 -115.80639648 72.31567383 C-115.55631836 71.27668945 -115.30624023 70.23770508 -115.04858398 69.16723633 C-108.16063408 45.23371408 -75.22578302 23.7796623 -54.80639648 12.31567383 C-46.86305371 8.31567383 -46.86305371 8.31567383 -43.80639648 8.31567383 C-43.80639648 7.65567383 -43.80639648 6.99567383 -43.80639648 6.31567383 C-41.4336642 5.68089091 -39.05868725 5.05798137 -36.68139648 4.44067383 C-35.71266602 4.17963867 -35.71266602 4.17963867 -34.72436523 3.91333008 C-23.27987994 0.97046243 -11.79482844 -0.0389554 0 0 Z "
        fill="var(--logo-fg-color)"
        transform="translate(688.806396484375,191.684326171875)"
      />
    </svg>
  )
}
