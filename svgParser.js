/* temperaturerecord.org provided no way to download its data as a CSV. 
For pre-1000AD data points, this didn't matter, because they only had data points for every 100 years.
For 1000 - 1760, I parsed the SVG path element to grab the values.
This is the script for doing so.
In hindesight, I could have used this to parse the 1880 - 2014 data as well, but I suppose it doesn't hurt to have a variety of data sources.
*/

// Split SVG path (obtained by inspecting the source and finding the HTML element) into points using .split(" L ")
var entries = ("M 0 114.20400000000001 L 0.67974333116589 124.02799999999999 L 1.3594866623318 124.02799999999999 L 2.0392299934977 119.11600000000001 L 2.7189733246636 127.71200000000002 L 3.4005789663258 141.22 L 4.0803222974917 125.256 L 4.7600656286576 98.24000000000001 L 5.4398089598235 99.46800000000002 L 6.1214146014857 112.976 L 6.8011579326516 114.20400000000001 L 7.4809012638175 109.292 L 8.1606445949834 110.51999999999998 L 8.8422502366456 120.344 L 9.5219935678115 120.344 L 10.201736898977 99.46800000000002 L 10.881480230143 77.364 L 11.563085871806 73.68 L 12.242829202971 87.18799999999999 L 12.922572534137 97.012 L 13.602315865303 101.924 L 14.283921506965 117.888 L 14.963664838131 120.344 L 15.643408169297 100.69600000000003 L 16.323151500463 97.012 L 17.004757142125 114.20400000000001 L 17.684500473291 121.572 L 18.364243804457 110.51999999999998 L 19.043987135623 100.69600000000003 L 19.725592777285 99.46800000000002 L 20.405336108451 98.24000000000001 L 21.085079439617 103.15200000000002 L 21.764822770783 116.66 L 22.446428412445 126.48400000000001 L 23.126171743611 130.168 L 23.805915074777 135.08 L 24.485658405943 131.39600000000002 L 25.167264047605 120.344 L 25.847007378771 115.43199999999999 L 26.526750709937 115.43199999999999 L 27.206494041103 109.292 L 27.888099682765 100.69600000000003 L 28.567843013931 112.976 L 29.247586345097 138.76399999999998 L 29.927329676263 144.904 L 30.608935317925 130.168 L 31.288678649091 119.11600000000001 L 31.968421980257 130.168 L 32.648165311423 152.272 L 33.329770953085 149.816 L 34.009514284251 132.62400000000002 L 34.689257615417 126.48400000000001 L 35.369000946583 131.39600000000002 L 36.050606588245 135.08 L 36.730349919411 137.53600000000003 L 37.410093250577 144.904 L 38.089836581742 141.22 L 38.771442223405 132.62400000000002 L 39.451185554571 135.08 L 40.130928885736 135.08 L 40.810672216902 112.976 L 41.492277858565 94.55600000000001 L 42.17202118973 110.51999999999998 L 42.851764520896 126.48400000000001 L 43.531507852062 111.74799999999999 L 44.213113493725 101.924 L 44.89285682489 125.256 L 45.572600156056 152.272 L 46.252343487222 159.64000000000001 L 46.933949128884 162.096 L 47.61369246005 160.86800000000002 L 48.293435791216 149.816 L 48.973179122382 142.448 L 49.654784764044 143.676 L 50.33452809521 139.99200000000002 L 51.014271426376 130.168 L 51.694014757542 128.94 L 52.375620399204 136.30800000000002 L 53.05536373037 138.76399999999998 L 53.735107061536 125.256 L 54.414850392702 111.74799999999999 L 55.096456034364 105.60799999999998 L 55.77619936553 108.064 L 56.455942696696 114.20400000000001 L 57.135686027862 111.74799999999999 L 57.817291669524 105.60799999999998 L 58.49703500069 97.012 L 59.176778331856 94.55600000000001 L 59.856521663022 100.69600000000003 L 60.538127304684 103.15200000000002 L 61.21787063585 94.55600000000001 L 61.897613967016 88.416 L 62.577357298182 97.012 L 63.258962939844 110.51999999999998 L 63.93870627101 112.976 L 64.618449602176 115.43199999999999 L 65.298192933342 122.80000000000001 L 65.979798575004 139.99200000000002 L 66.65954190617 152.272 L 67.339285237336 132.62400000000002 L 68.019028568501 115.43199999999999 L 68.698771899667 120.344 L 69.378515230833 135.08 L 70.058258561999 136.30800000000002 L 70.738001893165 99.46800000000002 L 71.419607534827 65.084 L 72.099350865993 69.99600000000001 L 72.779094197159 95.78400000000002 L 73.458837528325 108.064 L 74.140443169987 105.60799999999998 L 74.820186501153 105.60799999999998 L 75.499929832319 101.924 L 76.179673163485 99.46800000000002 L 76.861278805147 106.83600000000001 L 77.541022136313 105.60799999999998 L 78.220765467479 93.328 L 78.900508798645 89.644 L 79.582114440307 97.012 L 80.261857771473 104.38000000000002 L 80.941601102639 106.83600000000001 L 81.621344433805 116.66 L 82.302950075467 127.71200000000002 L 82.982693406633 128.94 L 83.662436737799 132.62400000000002 L 84.342180068965 131.39600000000002 L 85.023785710627 133.852 L 85.703529041793 154.728 L 86.383272372959 160.86800000000002 L 87.063015704125 139.99200000000002 L 87.744621345787 122.80000000000001 L 88.424364676953 115.43199999999999 L 89.104108008119 120.344 L 89.783851339284 144.904 L 90.465456980947 163.324 L 91.145200312113 152.272 L 91.824943643278 136.30800000000002 L 92.504686974444 128.94 L 93.186292616107 122.80000000000001 L 93.866035947272 127.71200000000002 L 94.545779278438 139.99200000000002 L 95.225522609604 142.448 L 95.907128251267 136.30800000000002 L 96.586871582432 125.256 L 97.266614913598 110.51999999999998 L 97.946358244764 104.38000000000002 L 98.627963886426 115.43199999999999 L 99.307707217592 127.71200000000002 L 99.987450548758 136.30800000000002 L 100.66719387992 137.53600000000003 L 101.34879952159 138.76399999999998 L 102.02854285275 155.95600000000002 L 102.70828618392 164.55200000000002 L 103.38802951508 147.35999999999999 L 104.06963515675 133.852 L 104.74937848791 128.94 L 105.42912181908 124.02799999999999 L 106.10886515024 127.71200000000002 L 106.79047079191 130.168 L 107.47021412307 120.344 L 108.14995745424 111.74799999999999 L 108.8297007854 114.20400000000001 L 109.51130642707 128.94 L 110.19104975823 139.99200000000002 L 110.8707930894 137.53600000000003 L 111.55053642056 131.39600000000002 L 112.23214206223 122.80000000000001 L 112.91188539339 116.66 L 113.59162872456 121.572 L 114.27137205572 126.48400000000001 L 114.95297769739 126.48400000000001 L 115.63272102855 139.99200000000002 L 116.31246435972 153.5 L 116.99220769088 146.132 L 117.67381333255 128.94 L 118.35355666371 125.256 L 119.03329999488 133.852 L 119.71304332604 133.852 L 120.39464896771 121.572 L 121.07439229887 110.51999999999998 L 121.75413563004 119.11600000000001 L 122.4338789612 128.94 L 123.11548460287 121.572 L 123.79522793403 112.976 L 124.4749712652 115.43199999999999 L 125.15471459636 120.344 L 125.83632023803 128.94 L 126.51606356919 139.99200000000002 L 127.19580690036 139.99200000000002 L 127.87555023152 135.08 L 128.55715587319 132.62400000000002 L 129.23689920435 132.62400000000002 L 129.91664253552 135.08 L 130.59638586668 138.76399999999998 L 131.27799150835 144.904 L 131.95773483951 147.35999999999999 L 132.63747817068 148.588 L 133.31722150184 155.95600000000002 L 133.99882714351 152.272 L 134.67857047467 151.044 L 135.35831380584 157.184 L 136.038057137 148.588 L 136.71966277867 133.852 L 137.39940610983 124.02799999999999 L 138.079149441 119.11600000000001 L 138.75889277216 120.344 L 139.44049841383 136.30800000000002 L 140.12024174499 155.95600000000002 L 140.79998507616 165.78 L 141.47972840732 164.55200000000002 L 142.16133404899 151.044 L 142.84107738015 135.08 L 143.52082071132 125.256 L 144.20056404248 122.80000000000001 L 144.88216968414 126.48400000000001 L 145.56191301531 136.30800000000002 L 146.24165634648 146.132 L 146.92139967764 158.412 L 147.6030053193 181.744 L 148.28274865047 180.51600000000002 L 148.96249198164 148.588 L 149.6422353128 131.39600000000002 L 150.32384095446 131.39600000000002 L 151.00358428563 125.256 L 151.6833276168 122.80000000000001 L 152.36307094796 124.02799999999999 L 153.04467658962 122.80000000000001 L 153.72441992079 131.39600000000002 L 154.40416325196 141.22 L 155.08390658312 119.11600000000001 L 155.76551222478 98.24000000000001 L 156.44525555595 101.924 L 157.12499888712 112.976 L 157.80474221828 130.168 L 158.48634785994 151.044 L 159.16609119111 159.64000000000001 L 159.84583452228 163.324 L 160.52557785344 167.00799999999998 L 161.2071834951 158.412 L 161.88692682627 143.676 L 162.56667015744 136.30800000000002 L 163.2464134886 130.168 L 163.92801913026 126.48400000000001 L 164.60776246143 133.852 L 165.2875057926 143.676 L 165.96724912376 143.676 L 166.64885476542 144.904 L 167.32859809659 152.272 L 168.00834142776 143.676 L 168.68808475892 120.344 L 169.36969040058 110.51999999999998 L 170.04943373175 124.02799999999999 L 170.72917706292 142.448 L 171.40892039408 152.272 L 172.09052603574 167.00799999999998 L 172.77026936691 181.744 L 173.45001269808 174.376 L 174.12975602924 159.64000000000001 L 174.8113616709 164.55200000000002 L 175.49110500207 175.60399999999998 L 176.17084833324 159.64000000000001 L 176.8505916644 136.30800000000002 L 177.53219730606 128.94 L 178.21194063723 135.08 L 178.8916839684 155.95600000000002 L 179.57142729956 179.288 L 180.25303294122 167.00799999999998 L 180.93277627239 135.08 L 181.61251960356 121.572 L 182.29226293472 136.30800000000002 L 182.97386857638 157.184 L 183.65361190755 157.184 L 184.33335523872 146.132 L 185.01309856988 151.044 L 185.69470421154 164.55200000000002 L 186.37444754271 148.588 L 187.05419087388 135.08 L 187.73393420504 151.044 L 188.4155398467 164.55200000000002 L 189.09528317787 154.728 L 189.77502650904 137.53600000000003 L 190.4547698402 137.53600000000003 L 191.13637548186 152.272 L 191.81611881303 158.412 L 192.4958621442 162.096 L 193.17560547536 186.656 L 193.85721111702 203.848 L 194.53695444819 180.51600000000002 L 195.21669777936 163.324 L 195.89644111052 176.832 L 196.57804675218 178.06 L 197.25779008335 163.324 L 197.93753341452 167.00799999999998 L 198.61727674568 184.2 L 199.29888238734 185.428 L 199.97862571851 180.51600000000002 L 200.65836904968 184.2 L 201.33811238084 187.88400000000001 L 202.0197180225 181.744 L 202.69946135367 184.2 L 203.37920468483 189.11200000000002 L 204.058948016 181.744 L 204.73869134717 168.23600000000002 L 205.41843467833 159.64000000000001 L 206.0981780095 162.096 L 206.77792134066 164.55200000000002 L 207.45952698233 163.324 L 208.13927031349 169.464 L 208.81901364466 173.148 L 209.49875697582 165.78 L 210.18036261749 158.412 L 210.86010594865 148.588 L 211.53984927982 142.448 L 212.21959261098 147.35999999999999 L 212.90119825265 144.904 L 213.58094158381 142.448 L 214.26068491498 158.412 L 214.94042824614 168.23600000000002 L 215.62203388781 170.692 L 216.30177721897 178.06 L 216.98152055014 174.376 L 217.6612638813 154.728 L 218.34286952297 144.904 L 219.02261285413 157.184 L 219.7023561853 168.23600000000002 L 220.38209951646 155.95600000000002 L 221.06370515813 138.76399999999998 L 221.74344848929 128.94 L 222.42319182046 132.62400000000002 L 223.10293515162 152.272 L 223.78454079329 157.184 L 224.46428412445 133.852 L 225.14402745562 120.344 L 225.82377078678 124.02799999999999 L 226.50537642845 133.852 L 227.18511975961 151.044 L 227.86486309078 173.148 L 228.54460642194 180.51600000000002 L 229.22621206361 178.06 L 229.90595539477 184.2 L 230.58569872594 176.832 L 231.2654420571 159.64000000000001 L 231.94704769877 142.448 L 232.62679102993 131.39600000000002 L 233.3065343611 132.62400000000002 L 233.98627769226 142.448 L 234.66788333393 146.132 L 235.34762666509 146.132 L 236.02736999626 148.588 L 236.70711332742 149.816 L 237.38871896909 152.272 L 238.06846230025 163.324 L 238.74820563142 167.00799999999998 L 239.42794896258 146.132 L 240.10955460425 135.08 L 240.78929793541 138.76399999999998 L 241.46904126658 127.71200000000002 L 242.14878459774 109.292 L 242.83039023941 111.74799999999999 L 243.51013357057 127.71200000000002 L 244.18987690174 135.08 L 244.8696202329 144.904 L 245.55122587457 159.64000000000001 L 246.23096920573 160.86800000000002 L 246.9107125369 151.044 L 247.59045586806 154.728 L 248.27206150973 159.64000000000001 L 248.95180484089 144.904 L 249.63154817206 127.71200000000002 L 250.31129150322 128.94 L 250.99289714489 142.448 L 251.67264047605 152.272 L 252.35238380722 165.78 L 253.03212713838 168.23600000000002 L 253.71373278005 151.044 L 254.39347611121 138.76399999999998 L 255.07321944238 144.904 L 255.75296277354 162.096 L 256.43456841521 175.60399999999998 L 257.11431174637 176.832 L 257.79405507754 176.832 L 258.4737984087 169.464 L 259.15540405036 162.096 L 259.83514738153 160.86800000000002 L 260.5148907127 149.816 L 261.19463404386 133.852 L 261.87623968552 124.02799999999999 L 262.55598301669 128.94 L 263.23572634786 137.53600000000003 L 263.91546967902 138.76399999999998 L 264.59707532068 146.132 L 265.27681865185 155.95600000000002 L 265.95656198302 151.044 L 266.63630531418 146.132 L 267.31791095584 141.22 L 267.99765428701 135.08 L 268.67739761818 144.904 L 269.35714094934 162.096 L 270.038746591 165.78 L 270.71848992217 164.55200000000002 L 271.39823325334 168.23600000000002 L 272.0779765845 170.692 L 272.75771991567 167.00799999999998 L 273.43746324683 158.412 L 274.117206578 153.5 L 274.79694990917 142.448 L 275.47855555083 124.02799999999999 L 276.15829888199 120.344 L 276.83804221316 137.53600000000003 L 277.51778554433 141.22 L 278.19939118599 135.08 L 278.87913451715 135.08 L 279.55887784832 133.852 L 280.23862117949 136.30800000000002 L 280.92022682115 152.272 L 281.59997015231 159.64000000000001 L 282.27971348348 151.044 L 282.95945681465 131.39600000000002 L 283.64106245631 112.976 L 284.32080578747 112.976 L 285.00054911864 124.02799999999999 L 285.68029244981 132.62400000000002 L 286.36189809147 137.53600000000003 L 287.04164142263 128.94 L 287.7213847538 110.51999999999998 L 288.40112808497 110.51999999999998 L 289.08273372663 128.94 L 289.76247705779 137.53600000000003 L 290.44222038896 122.80000000000001 L 291.12196372013 114.20400000000001 L 291.80356936179 125.256 L 292.48331269295 138.76399999999998 L 293.16305602412 147.35999999999999 L 293.84279935529 149.816 L 294.52440499695 157.184 L 295.20414832811 163.324 L 295.88389165928 148.588 L 296.56363499045 137.53600000000003 L 297.24524063211 148.588 L 297.92498396327 158.412 L 298.60472729444 149.816 L 299.28447062561 142.448 L 299.96607626727 151.044 L 300.64581959843 152.272 L 301.3255629296 136.30800000000002 L 302.00530626076 136.30800000000002 L 302.68691190243 153.5 L 303.36665523359 167.00799999999998 L 304.04639856476 178.06 L 304.72614189592 189.11200000000002 L 305.40774753759 197.708 L 306.08749086875 200.164 L 306.76723419992 191.568 L 307.44697753108 186.656 L 308.12858317275 182.972 L 308.80832650391 180.51600000000002 L 309.48806983508 194.024 L 310.16781316624 213.672 L 310.84941880791 209.988 L 311.52916213907 182.972 L 312.20890547024 169.464 L 312.8886488014 180.51600000000002 L 313.57025444307 191.568 L 314.24999777423 185.428 L 314.9297411054 182.972 L 315.60948443656 197.708 L 316.29109007823 197.708 L 316.97083340939 181.744 L 317.65057674056 179.288 L 318.33032007172 185.428 L 319.01192571339 169.464 L 319.69166904455 149.816 L 320.37141237572 152.272 L 321.05115570688 163.324 L 321.73276134855 174.376 L 322.41250467971 190.34 L 323.09224801088 196.48000000000002 L 323.77199134204 179.288 L 324.45359698371 160.86800000000002 L 325.13334031487 168.23600000000002 L 325.81308364604 184.2 L 326.4928269772 180.51600000000002 L 327.17443261887 174.376 L 327.85417595003 180.51600000000002 L 328.5339192812 165.78 L 329.21366261236 135.08 L 329.89526825403 124.02799999999999 L 330.57501158519 124.02799999999999 L 331.25475491636 125.256 L 331.93449824752 125.256 L 332.61610388919 112.976 L 333.29584722035 114.20400000000001 L 333.97559055152 148.588 L 334.65533388268 181.744 L 335.33693952435 169.464 L 336.01668285551 152.272 L 336.69642618668 168.23600000000002 L 337.37616951784 198.936 L 338.05777515951 206.304 L 338.73751849067 187.88400000000001 L 339.41726182184 184.2 L 340.097005153 195.252 L 340.77674848417 182.972 L 341.45649181534 165.78 L 342.1362351465 167.00799999999998 L 342.81597847767 175.60399999999998 L 343.49758411933 181.744 L 344.1773274505 181.744 L 344.85707078166 176.832 L 345.53681411283 169.464 L 346.21841975449 157.184 L 346.89816308566 152.272 L 347.57790641682 162.096 L 348.25764974799 178.06 L 348.93925538965 184.2 L 349.61899872082 182.972 L 350.29874205198 180.51600000000002 L 350.97848538315 173.148 L 351.66009102481 168.23600000000002 L 352.33983435598 164.55200000000002 L 353.01957768714 155.95600000000002 L 353.69932101831 162.096 L 354.38092665997 194.024 L 355.06066999114 225.952 L 355.7404133223 229.636 L 356.42015665347 207.53199999999998 L 357.10176229513 189.11200000000002 L 357.7815056263 182.972 L 358.46124895746 192.796 L 359.14099228863 216.128 L 359.82259793029 225.952 L 360.50234126145 219.812 L 361.18208459262 212.44400000000002 L 361.86182792379 208.76 L 362.54343356545 207.53199999999998 L 363.22317689661 192.796 L 363.90292022778 171.92 L 364.58266355895 163.324 L 365.26426920061 167.00799999999998 L 365.94401253177 167.00799999999998 L 366.62375586294 160.86800000000002 L 367.30349919411 180.51600000000002 L 367.98510483577 225.952 L 368.66484816693 243.144 L 369.3445914981 230.864 L 370.02433482927 229.636 L 370.70594047093 230.864 L 371.38568380209 223.49599999999998 L 372.06542713326 216.128 L 372.74517046443 202.62 L 373.42677610609 180.51600000000002 L 374.10651943725 169.464 L 374.78626276842 170.692 L 375.46600609959 165.78 L 376.14761174125 158.412 L 376.82735507241 167.00799999999998 L 377.50709840358 173.148 L 378.18684173475 167.00799999999998 L 378.86844737641 173.148 L 379.54819070757 189.11200000000002 L 380.22793403874 190.34 L 380.90767736991 176.832 L 381.58928301157 164.55200000000002 L 382.26902634273 158.412 L 382.9487696739 157.184 L 383.62851300507 155.95600000000002 L 384.31011864673 165.78 L 384.98986197789 173.148 L 385.66960530906 165.78 L 386.34934864023 163.324 L 387.03095428189 174.376 L 387.71069761305 194.024 L 388.39044094422 208.76 L 389.07018427539 201.392 L 389.75178991705 191.568 L 390.43153324821 191.568 L 391.11127657938 203.848 L 391.79101991055 212.44400000000002 L 392.47262555221 213.672 L 393.15236888337 232.09199999999998 L 393.83211221454 265.248 L 394.51185554571 261.56399999999996 L 395.19346118737 216.128 L 395.87320451853 186.656 L 396.5529478497 187.88400000000001 L 397.23269118087 202.62 L 397.91429682253 213.672 L 398.59404015369 206.304 L 399.27378348486 192.796 L 399.95352681603 194.024 L 400.63513245769 212.44400000000002 L 401.31487578885 228.40800000000002 L 401.99461912002 225.952 L 402.67436245119 223.49599999999998 L 403.35596809285 208.76 L 404.03571142401 187.88400000000001 L 404.71545475518 186.656 L 405.39519808635 190.34 L 406.07680372801 185.428 L 406.75654705917 181.744 L 407.43629039034 197.708 L 408.11603372151 217.356 L 408.79763936317 206.304 L 409.47738269433 190.34 L 410.1571260255 189.11200000000002 L 410.83686935667 189.11200000000002 L 411.51847499833 187.88400000000001 L 412.19821832949 194.024 L 412.87796166066 203.848 L 413.55770499183 202.62 L 414.23931063349 187.88400000000001 L 414.91905396465 178.06 L 415.59879729582 180.51600000000002 L 416.27854062699 191.568 L 416.96014626865 197.708 L 417.63988959981 189.11200000000002 L 418.31963293098 169.464 L 418.99937626214 157.184 L 419.68098190381 162.096 L 420.36072523497 174.376 L 421.04046856614 174.376 L 421.7202118973 168.23600000000002 L 422.40181753897 174.376 L 423.08156087013 185.428 L 423.7613042013 187.88400000000001 L 424.44104753246 181.744 L 425.12265317413 176.832 L 425.80239650529 187.88400000000001 L 426.48213983646 185.428 L 427.16188316762 175.60399999999998 L 427.84348880929 176.832 L 428.52323214045 192.796 L 429.20297547162 214.9 L 429.88271880278 217.356 L 430.56432444445 194.024 L 431.24406777561 174.376 L 431.92381110678 167.00799999999998 L 432.60355443794 168.23600000000002 L 433.28516007961 178.06 L 433.96490341077 178.06 L 434.64464674194 163.324 L 435.3243900731 164.55200000000002 L 436.00599571477 197.708 L 436.68573904593 221.04000000000002 L 437.3654823771 213.672 L 438.04522570826 201.392 L 438.72683134993 198.936 L 439.40657468109 201.392 L 440.08631801226 194.024 L 440.76606134342 171.92 L 441.44766698509 158.412 L 442.12741031625 157.184 L 442.80715364742 167.00799999999998 L 443.48689697858 186.656 L 444.16850262025 198.936 L 444.84824595141 207.53199999999998 L 445.52798928258 209.988 L 446.20773261374 196.48000000000002 L 446.88933825541 180.51600000000002 L 447.56908158657 178.06 L 448.24882491774 178.06 L 448.9285682489 173.148 L 449.61017389057 170.692 L 450.28991722173 176.832 L 450.9696605529 181.744 L 451.64940388406 184.2 L 452.33100952573 184.2 L 453.01075285689 175.60399999999998 L 453.69049618806 185.428 L 454.37023951922 211.216 L 455.05184516089 214.9 L 455.73158849205 194.024 L 456.41133182322 170.692 L 457.09107515438 164.55200000000002 L 457.77268079605 173.148 L 458.45242412721 185.428 L 459.13216745838 197.708 L 459.81191078954 201.392 L 460.49351643121 196.48000000000002 L 461.17325976237 191.568 L 461.85300309354 190.34 L 462.5327464247 195.252 L 463.21435206637 194.024 L 463.89409539753 176.832 L 464.5738387287 176.832 L 465.25358205986 200.164 L 465.93518770153 216.128 L 466.61493103269 213.672 L 467.29467436386 195.252 L 467.97441769502 187.88400000000001 L 468.65602333669 203.848 L 469.33576666785 213.672 L 470.01550999902 200.164 L 470.69525333018 189.11200000000002 L 471.37685897185 186.656 L 472.05660230301 184.2 L 472.73634563418 186.656 L 473.41608896534 197.708 L 474.09769460701 207.53199999999998 L 474.77743793817 212.44400000000002 L 475.45718126934 208.76 L 476.1369246005 192.796 L 476.81666793167 181.744 L 477.49641126283 184.2 L 478.176154594 194.024 L 478.85589792517 187.88400000000001 L 479.53750356683 171.92 L 480.21724689799 180.51600000000002 L 480.89699022916 211.216 L 481.57673356033 218.584 L 482.25833920199 198.936 L 482.93808253315 182.972 L 483.61782586432 179.288 L 484.29756919549 179.288 L 484.97917483715 180.51600000000002 L 485.65891816831 182.972 L 486.33866149948 186.656 L 487.01840483065 190.34 L 487.70001047231 187.88400000000001 L 488.37975380347 179.288 L 489.05949713464 164.55200000000002 L 489.73924046581 149.816 L 490.42084610747 158.412 L 491.10058943863 182.972 L 491.7803327698 187.88400000000001 L 492.46007610097 170.692 L 493.14168174263 151.044 L 493.82142507379 135.08 L 494.50116840496 133.852 L 495.18091173613 158.412 L 495.86251737779 189.11200000000002 L 496.54226070895 192.796 L 497.22200404012 185.428 L 497.90174737129 187.88400000000001 L 498.58335301295 194.024 L 499.26309634411 205.07600000000002 L 499.94283967528 213.672 L 500.62258300645 201.392 L 501.30418864811 196.48000000000002 L 501.98393197927 203.848 L 502.66367531044 206.304 L 503.34341864161 196.48000000000002 L 504.02502428327 185.428 L 504.70476761443 182.972 L 505.3845109456 176.832 L 506.06425427677 174.376 L 506.74585991843 168.23600000000002 L 507.42560324959 146.132 L 508.10534658076 137.53600000000003 L 508.78508991193 153.5 L 509.46669555359 162.096 L 510.14643888475 159.64000000000001 L 510.82618221592 170.692 L 511.50592554709 196.48000000000002 L 512.18753118875 207.53199999999998 L 512.86727451991 187.88400000000001 L 513.54701785108 167.00799999999998 L 514.22676118225 162.096 L 514.90836682391 160.86800000000002 L 515.58811015507 158.412 L 516.26785348624 155.95600000000002 L 516.94759681741 142.448 L 517.62920245907 135.08").split(" L ");
// Remove the "M" before the first entry
entries[0] = "0 114.20400000000001";
// Map the first value in each pair to the year
entries = entries.map((val) => {
    var temp = val.split(" ");
    return [Math.floor(parseFloat(temp[0])/0.67974333116589 + 1000), temp[1]];
});
// Map the second value in each pair to the temperature anomaly. Conversion equation found by solving system of equations for two arbitrary points.
entries = entries.map((val) => {
    var value = Math.round((val[1] - 122.8)/(-122.8) * 100) / 100;
    return val[0] + "," + value;
})
// Reduce to CSV format
entries.reduce((prev, cur) => {
    return prev + cur + "\n";
}, "year,value\n");