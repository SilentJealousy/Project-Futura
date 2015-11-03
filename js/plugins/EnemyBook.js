1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
175
176
177
178
179
180
181
182
183
184
185
186
187
188
189
190
191
192
193
194
195
196
197
198
199
200
201
202
203
204
205
206
207
208
209
210
211
212
213
214
215
216
217
218
219
220
221
222
223
224
225
226
227
228
229
230
231
232
233
234
235
236
237
238
239
240
241
242
243
244
245
246
247
248
249
250
251
252
253
254
255
256
257
258
259
260
261
262
263
264
265
266
267
268
269
270
271
272
273
274
275
276
277
278
279
280
281
282
283
284
285
286
287
288
289
290
291
292
293
294
295
296
297
298
299
300
301
302
303
304
305
306
307
308
309
310
311
312
313
314
315
316
317
318
319
320
321
322
323
324
325
326
327
328
329
330
331
332
333
334
335
336
337
338
339
340
341
342
343
344
345
346
347
348
349
350
351
352
353
354
355
356
357
358
359
360
361
362
363
364
365
366
367
368
369
370
371
372
373
374
375
376
377
378
379
380
381
382
383
384
385
386
387
388
389
390
391
392
393
394
395
396
397
398
399
400
401
402
403
404
405
406
407
408
409
410
411
412
413
414
415
416
417
418
419
420
421
422
423
424
425
426
427
428
429
430
431
432
433
434
435
436
437
438
439
440
441
442
443
444
445
446
447
448
449
450
451
452
453
454
455
456
457
458
459
460
461
462
463
464
465
466
467
468
469
470
471
472
473
474
475
476
477
478
479
480
481
482
483
484
485
486
487
488
489
490
491
492
493
494
495
496
497
498
499
500
501
502
503
504
505
506
507
508
509
510
511
512
513
514
515
516
517
518
519
520
521
522
523
524
525
526
527
528
529
530
531
532
533
534
535
536
537
538
539
540
541
542
543
544
545
546
547
548
549
550
551
552
553
554
555
556
557
558
559
560
561
562
563
564
565
566
567
568
569
570
571
572
573
574
575
576
577
578
579
580
581
582
583
584
585
586
587
588
589
590
591
592
593
594
595
596
597
598
599
600
601
602
603
604
605
606
607
608
609
610
611
612
613
614
615
616
617
618
619
620
621
622
623
624
625
626
627
628
629
630
631
632
633
634
635
636
637
638
639
640
641
642
643
644
645
646
647
648
649
650
651
652
653
654
655
656
657
658
659
660
661
662
663
664
665
666
667
668
669
670
671
672
673
674
675
676
677
678
679
680
681
682
683
684
685
686
687
688
689
690
691
692
693
694
695
696
697
698
699
700
701
702
703
704
705
706
707
708
709
710
711
712
713
714
715
716
717
718
719
720
721
722
723
724
725
726
727
728
729
730
731
732
733
734
735
736
737
738
739
740
741
742
743
744
﻿//=============================================================================
// EnemyBook.js
//=============================================================================
 
/*:
 * @plugindesc v1.03 + SkottyTV Update 03 // Displays detailed statuses of enemys.
 * @author Yoji Ojima (Compatibility with YEP) / + SkottyTV (thx to DragonPC)
 *
 * @param ----- Functions -----
 * 
 * @param Unknown Data
 * @desc The index name for an unknown enemy.
 * @default ??????
 *
 * @param AutoFill
 * @desc Decide if enemys will automaticly show up in the book when defeated
 * @default false
 *
 * @param Gold Icon
 * @desc Decide if you want to use the Gold Icon from                   Yanfly Core Engine. (true or false)
 * @default true
 * 
 * @param ID before Name
 * @desc Decide if enemys will have the ID number in front of their name
 * @default true
 *
 * @param Enemys in Row
 * @desc Decide how many enemys you want to show in one row.            (default 1, maximum is 4 !)
 * @default 1
 *
 * @param ----- Visuals -----
 *
 * @param Half Index Height
 * @desc Decide if you want to half the Index height.                   (default true)
 * @default true
 *
 * @param Show Status Switch
 * @desc Choose the switch ID that shows the status. (default 0)
 * @default 0
 *
 * @param Show EXP Switch
 * @desc Choose the switch ID that shows the EXP.   (default 0)
 * @default 0
 *
 * @param Show Gold Switch
 * @desc Choose the switch ID that shows the Gold.  (default 0)
 * @default 0
 *
 * @param Show Items Switch
 * @desc Choose the switch ID that shows the Items. (default 0)
 * @default 0
 *
 * @param ----- Animation -----
 *
 * @param Pulsing Enemy
 * @desc Decide if you want to display an animated enemy.               (default true)
 * @default true
 *
 * @param Pulsing Intensity
 * @desc Decide how strong the animation should be.               Higher number = Less Intensity (default 4)
 * @default 4
 * 
 * @help
 *
 * ============================================================================
 * SkottyTV Update 01 ->
 *  
 * - Decide if enemys will get an entry automaticly when they appear/transform!
 * - Now you can add an Enemy by a variable value!
 * - Able to add a third info line (desc3)!
 * - Advanced Visual upgrades!
 *
 * SkottyTV Update 02 ->
 * 
 * - Decide how many columns appear in one row!
 * - Decide if you want to use the Gold Icon from Yanfly Core Engine!
 *
 * SkottyTV Update 03 ->
 * 
 * - Decide if you want to half the Index height.
 * - Advanced Visual upgrades!
 * - Pulsing animation upgrade!
 * - Use switches to enable different information!
 *   (EXP, Gold, Items and Parameters)
 *
 * ============================================================================
 *
 * Plugin Command:
 *   EnemyBook open         # Open the enemy book screen
 *   EnemyBook add 3        # Add enemy #3 to the enemy book
 *   EnemyBook addvar 10    # Add enemy (ID) that is in variable 10
 *   EnemyBook remove 4     # Remove enemy #4 from the enemy book
 *   EnemyBook complete     # Complete the enemy book
 *   EnemyBook clear        # Clear the enemy book
 *
 * Enemy Note:
 *   <desc1:The mighty Duck>   # Description text in the enemy book, line 1
 *   <desc2:This is Line 2>    # Description text in the enemy book, line 2
 *   <desc3:Some Info here?>   # Description text in the enemy book, line 2
 *   <book:no>                 # This enemy does not appear in the enemy book
 *
 * ============================================================================
 *
 * Investigate Skill Tutorial:
 * (You will need YanFly´s Battle Engine Core and ActSeqPack1 to get it work)
 *
 * - First set the "AutoFill" option of this plugin to false
 * - Now create a skill which calls a common event X and have the following
 *   in its notebox:
 *   <Target Action>
 *    Change Variable Y = target._enemyId
 *   </Target Action>
 * - Now in the common event X call a Plugin-Line and write:
 *   EnemyBook addvar Y
 * - Done!
 *
 * (X and Y is a number you choose)
 */
 
/*:ja
 * @plugindesc モンスター図鑑です。敵キャラの詳細なステータスを表示します。
 * @author Yoji Ojima (Compatibility with YEP) / + SkottyTV (thx to DragonPC)
 *
* @param ----- Functions -----
 * 
 * @param Unknown Data
 * @desc The index name for an unknown enemy.
 * @default ??????
 *
 * @param AutoFill
 * @desc Decide if enemys will automaticly show up in the book when defeated
 * @default false
 *
 * @param Gold Icon
 * @desc Decide if you want to use the Gold Icon from                   Yanfly Core Engine. (true or false)
 * @default true
 * 
 * @param ID before Name
 * @desc Decide if enemys will have the ID number in front of their name
 * @default true
 *
 * @param Enemys in Row
 * @desc Decide how many enemys you want to show in one row.            (default 1, maximum is 4 !)
 * @default 1
 *
 * @param ----- Visuals -----
 *
 * @param Half Index Height
 * @desc Decide if you want to half the Index height.                   (default true)
 * @default true
 *
 * @param Show Status Switch
 * @desc Choose the switch ID that shows the status. (default 0)
 * @default 0
 *
 * @param Show EXP Switch
 * @desc Choose the switch ID that shows the EXP.   (default 0)
 * @default 0
 *
 * @param Show Gold Switch
 * @desc Choose the switch ID that shows the Gold.  (default 0)
 * @default 0
 *
 * @param Show Items Switch
 * @desc Choose the switch ID that shows the Items. (default 0)
 * @default 0
 *
 * @param ----- Animation -----
 *
 * @param Pulsing Enemy
 * @desc Decide if you want to display an animated enemy.               (default true)
 * @default true
 *
 * @param Pulsing Intensity
 * @desc Decide how strong the animation should be.               Higher number = Less Intensity (default 4)
 * @default 4
 * 
 * @help
 *
 * ============================================================================
 * SkottyTV Update 01 ->
 *  
 * - Decide if enemys will get an entry automaticly when they appear/transform!
 * - Now you can add an Enemy by a variable value!
 * - Able to add a third info line (desc3)!
 * - Advanced Visual upgrades!
 *
 * SkottyTV Update 02 ->
 * 
 * - Decide how many columns appear in one row!
 * - Decide if you want to use the Gold Icon from Yanfly Core Engine!
 *
 * SkottyTV Update 03 ->
 * 
 * - Decide if you want to half the Index height.
 * - Advanced Visual upgrades!
 * - Pulsing animation upgrade!
 * - Use switches to enable different informations!
 *   (EXP, Gold, Items and Parameters)
 *
 * ============================================================================
 *
 * プラグインコマンド:
 *   EnemyBook open         # 図鑑画面を開く
 *   EnemyBook add 3        # 敵キャラ３番を図鑑に追加
 *   EnemyBook addvar 10    # Add enemy that is in variable 10
 *   EnemyBook remove 4     # 敵キャラ４番を図鑑から削除
 *   EnemyBook complete     # 図鑑を完成させる
 *   EnemyBook clear        # 図鑑をクリアする
 *
 * 敵キャラのメモ:
 *   <desc1:なんとか>         # 説明１行目
 *   <desc2:かんとか>         # 説明２行目
 *   <desc3:かんとか>     # 説明3行目
 *   <book:no>              # 図鑑に載せない場合
 *
 * ============================================================================
 *
 * Investigate Skill Tutorial:
 * (You will need YanFly´s Battle Engine Core and ActSeqPack1 to get it work)
 *
 * - First set the "AutoFill" option of this plugin to false
 * - Now create a skill which calls a common event X and have the following
 *   in its notebox:
 *   <Target Action>
 *    Change Variable Y = target._enemyId
 *   </Target Action>
 * - Now in the common event X call a Plugin-Line and write:
 *   EnemyBook addvar Y
 * - Done!
 *
 * (X and Y is a number you choose)
 */
 
(function() {
 
    var parameters = PluginManager.parameters('EnemyBook');
    var unknownData = String(parameters['Unknown Data'] || '??????')
    var AutoFill = String(parameters['AutoFill'] || 'false');
    var IDatName = String(parameters['ID before Name'] || 'true');
    var listEnemysRow = Number(parameters['Enemys in Row']);
    var goldIcon = String(parameters['Gold Icon'] || 'true');
    var IndexHeight = String(parameters['Half Index Height'] || 'true');
    var ShowEXP = Number(parameters['Show EXP Switch']);
    var ShowGold = Number(parameters['Show Gold Switch']);
    var ShowItems = Number(parameters['Show Items Switch']);
    var ShowStatus = Number(parameters['Show Status Switch']);
    var AnimEnemy = String(parameters['Pulsing Enemy'] || 'true');
    var AnimIntens = Number(parameters['Pulsing Intensity']);
 
    var _Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'EnemyBook') {
            switch (args[0]) {
            case 'open':
                SceneManager.push(Scene_EnemyBook);
                break;
            case 'add':
                $gameSystem.addToEnemyBook(Number(args[1]));
                break;
            case 'addvar':
                $gameSystem.addToEnemyBook(Number($gameVariables.value(args[1])));
                break;
            case 'remove':
                $gameSystem.removeFromEnemyBook(Number(args[1]));
                break;
            case 'complete':
                $gameSystem.completeEnemyBook();
                break;
            case 'clear':
                $gameSystem.clearEnemyBook();
                break;
            }
        }
    };
 
    Game_System.prototype.addToEnemyBook = function(enemyId) {
        if (!this._enemyBookFlags) {
            this.clearEnemyBook();
        }
        this._enemyBookFlags[enemyId] = true;
    };
 
    Game_System.prototype.removeFromEnemyBook = function(enemyId) {
        if (this._enemyBookFlags) {
            this._enemyBookFlags[enemyId] = false;
        }
    };
 
    Game_System.prototype.completeEnemyBook = function() {
        this.clearEnemyBook();
        for (var i = 1; i < $dataEnemies.length; i++) {
            this._enemyBookFlags[i] = true;
        }
    };
 
    Game_System.prototype.clearEnemyBook = function() {
        this._enemyBookFlags = [];
    };
 
    Game_System.prototype.isInEnemyBook = function(enemy) {
        if (this._enemyBookFlags && enemy) {
            return !!this._enemyBookFlags[enemy.id];
        } else {
            return false;
        }
    };
 
    var _Game_Troop_setup = Game_Troop.prototype.setup;
    Game_Troop.prototype.setup = function(troopId) {
        _Game_Troop_setup.call(this, troopId);
        this.members().forEach(function(enemy) {
            if (enemy.isAppeared()) {
 
        if (AutoFill === 'true') {
            $gameSystem.addToEnemyBook(enemy.enemyId());
                }
            }
        }, this);
    };
 
    var _Game_Enemy_appear = Game_Enemy.prototype.appear;
    Game_Enemy.prototype.appear = function() {
        _Game_Enemy_appear.call(this);
    if (AutoFill === 'true') {
            $gameSystem.addToEnemyBook(this._enemyId);
                }
    };
 
    var _Game_Enemy_transform = Game_Enemy.prototype.transform;
    Game_Enemy.prototype.transform = function(enemyId) {
        _Game_Enemy_transform.call(this, enemyId);
    if (AutoFill === 'true') {
            $gameSystem.addToEnemyBook(enemyId);
                }
    };
 
    function Scene_EnemyBook() {
        this.initialize.apply(this, arguments);
    }
 
    Scene_EnemyBook.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_EnemyBook.prototype.constructor = Scene_EnemyBook;
 
    Scene_EnemyBook.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };
 
    Scene_EnemyBook.prototype.create = function() {
 
        var w3 = Graphics.boxWidth / 3;
        var ww = (Graphics.boxWidth / 3)*2 + 2;
        var wh = Graphics.boxHeight / 5;
 
        Scene_MenuBase.prototype.create.call(this);
        this._indexWindow = new Window_EnemyBookIndex(0, 0);
        this._indexWindow.setHandler('cancel', this.popScene.bind(this));
         
        this._statusWindow = new Window_EnemyBookStatus(w3, 0, ww, wh);
        this._statusWindow2 = new Window_EnemyBookStatus2(w3, wh, ww, wh*2.5);
        this._statusWindow3 = new Window_EnemyBookStatus3(w3, wh*3.5, ww, wh*2);
        this.addWindow(this._indexWindow);
        this.addWindow(this._statusWindow);
        this.addWindow(this._statusWindow2);
        this.addWindow(this._statusWindow3);
        this._indexWindow.setStatusWindow(this._statusWindow);
        this._indexWindow.setStatusWindow2(this._statusWindow2);
        this._indexWindow.setStatusWindow3(this._statusWindow3);
    };
 
    function Window_EnemyBookIndex() {
        this.initialize.apply(this, arguments);
    }
 
    Window_EnemyBookIndex.prototype = Object.create(Window_Selectable.prototype);
    Window_EnemyBookIndex.prototype.constructor = Window_EnemyBookIndex;
 
    Window_EnemyBookIndex.lastTopRow = 0;
    Window_EnemyBookIndex.lastIndex  = 0;
 
    Window_EnemyBookIndex.prototype.initialize = function(x, y) {
        var width = Graphics.boxWidth / 3;
         
    if (IndexHeight === 'true') {
        var height = Graphics.boxHeight / 2;
    }
    else{
        var height = Graphics.boxHeight;
    }
         
         
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
        this.setTopRow(Window_EnemyBookIndex.lastTopRow);
        this.select(Window_EnemyBookIndex.lastIndex);
        this.activate();
    };
 
    Window_EnemyBookIndex.prototype.maxCols = function() {
        if (listEnemysRow > 4) {
            return 4;
        }
        else{
            return listEnemysRow;
        }
    };
 
    Window_EnemyBookIndex.prototype.maxItems = function() {
        return this._list ? this._list.length : 0;
    };
 
    Window_EnemyBookIndex.prototype.setStatusWindow = function(statusWindow) {
        this._statusWindow = statusWindow;
        this.updateStatus();
    };
    Window_EnemyBookIndex.prototype.setStatusWindow2 = function(statusWindow2) {
        this._statusWindow2 = statusWindow2;
        this.updateStatus();
    };
    Window_EnemyBookIndex.prototype.setStatusWindow3 = function(statusWindow3) {
        this._statusWindow3 = statusWindow3;
        this.updateStatus();
    };
 
    Window_EnemyBookIndex.prototype.update = function() {
        Window_Selectable.prototype.update.call(this);
        this.updateStatus();
    };
 
    Window_EnemyBookIndex.prototype.updateStatus = function() {
        if (this._statusWindow) {
            var enemy = this._list[this.index()];
            this._statusWindow.setEnemy(enemy);
        }
                if (this._statusWindow2) {
            var enemy = this._list[this.index()];
            this._statusWindow2.setEnemy(enemy);
        }
                if (this._statusWindow3) {
            var enemy = this._list[this.index()];
            this._statusWindow3.setEnemy(enemy);
        }
    };
 
    Window_EnemyBookIndex.prototype.refresh = function() {
        this._list = [];
        for (var i = 1; i < $dataEnemies.length; i++) {
            var enemy = $dataEnemies[i];
            if (enemy.name && enemy.meta.book !== 'no') {
                this._list.push(enemy);
            }
        }
        this.createContents();
        this.drawAllItems();
    };
 
    Window_EnemyBookIndex.prototype.drawItem = function(index) {
        var enemy = this._list[index];
        var rect = this.itemRectForText(index);
        var name;
        if ($gameSystem.isInEnemyBook(enemy)) {
        if (IDatName === 'true') {  
                    name = enemy.id + " - " + enemy.name;
        } else {
                name = enemy.name;
             }
        } else {
            name = unknownData;
        }
        this.drawText(name, rect.x, rect.y, rect.width);
    };
 
    Window_EnemyBookIndex.prototype.processCancel = function() {
        Window_Selectable.prototype.processCancel.call(this);
        Window_EnemyBookIndex.lastTopRow = this.topRow();
        Window_EnemyBookIndex.lastIndex = this.index();
    };
 
    function Window_EnemyBookStatus() {
        this.initialize.apply(this, arguments);
    }
    function Window_EnemyBookStatus2() {
       this.initialize.apply(this, arguments);
    }
    function Window_EnemyBookStatus3() {
        this.initialize.apply(this, arguments);
    }
 
    Window_EnemyBookStatus.prototype = Object.create(Window_Base.prototype);
    Window_EnemyBookStatus.prototype.constructor = Window_EnemyBookStatus;
     
    Window_EnemyBookStatus2.prototype = Object.create(Window_Base.prototype);
    Window_EnemyBookStatus2.prototype.constructor = Window_EnemyBookStatus2;
     
    Window_EnemyBookStatus3.prototype = Object.create(Window_Base.prototype);
    Window_EnemyBookStatus3.prototype.constructor = Window_EnemyBookStatus3;
 
     
    Window_EnemyBookStatus2.prototype.initialize = function(x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._enemy = null;
        this._enemySprite = new Sprite();
        this._enemySprite.anchor.x = 0.5;
        this._enemySprite.anchor.y = 0.5;
        this._enemySprite.x = (Graphics.boxWidth)/3;
        this._enemySprite.y = (Graphics.boxHeight/5)+35;
        this.addChildToBack(this._enemySprite);
        this.refresh();
    };
 
    Window_EnemyBookStatus.prototype.setEnemy = function(enemy) {
        if (this._enemy !== enemy) {
            this._enemy = enemy;
            this.refresh();
        }
    };
    Window_EnemyBookStatus2.prototype.setEnemy = function(enemy) {
        if (this._enemy !== enemy) {
            this._enemy = enemy;
            this.refresh();
        }
    };
    Window_EnemyBookStatus3.prototype.setEnemy = function(enemy) {
        if (this._enemy !== enemy) {
            this._enemy = enemy;
            this.refresh();
        }
    };
     
    if (AnimEnemy === 'true') { 
    Window_EnemyBookStatus2.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        if (this._enemySprite.bitmap) {
            var bitmapHeight = this._enemySprite.bitmap.height;
            var contentsHeight = this.contents.height;
             
                var scalex = (Math.cos(Graphics.frameCount*0.01))/AnimIntens;
                var scaley = ((Math.cos(Graphics.frameCount*0.01))/AnimIntens);
             
            this._enemySprite.scale.x = (scalex*scalex)+0.9;
            this._enemySprite.scale.y = (scaley*scaley)+0.9;
             
            if (bitmapHeight > contentsHeight) {
                this._enemySprite.scale.x = ((scalex*scalex)+0.9)-0.2;
                this._enemySprite.scale.y = ((scaley*scaley)+0.9)-0.2;
            }
        }
 
    };
    }
    else {
    Window_EnemyBookStatus2.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        if (this._enemySprite.bitmap) {
            var bitmapHeight = this._enemySprite.bitmap.height;
            var contentsHeight = this.contents.height;
             
                var scale = 1;
             
            this._enemySprite.scale.x = scale;
            this._enemySprite.scale.y = scale;
             
            if (bitmapHeight > contentsHeight) {
                this._enemySprite.scale.x = contentsHeight/bitmapHeight;
                this._enemySprite.scale.y = contentsHeight/bitmapHeight;
            }
        }
 
    };
    }
 
    Window_EnemyBookStatus.prototype.refresh = function() {
         
        this.contents.clear();
         
        var enemy = this._enemy;
        var x = 0;
        var y = 0;
        var lineHeight = this.lineHeight();
         
        if (!enemy || !$gameSystem.isInEnemyBook(enemy)) {
            return;
        }
         
        var descWidth = 1;
        x = 1;
        y = 0; //lineHeight*9
        this.drawTextEx(enemy.meta.desc1, x, (y + lineHeight * 0), descWidth);
        this.drawTextEx(enemy.meta.desc2, x, (y + lineHeight * 1)-8, descWidth);
        this.drawTextEx(enemy.meta.desc3, x, (y + lineHeight * 2)-16, descWidth);
    };
     
    Window_EnemyBookStatus2.prototype.refresh = function() {
         
        this.contents.clear();
         
        var enemy = this._enemy;
        var x = 0;
        var y = 0;
        var lineHeight = this.lineHeight();
 
        if (!enemy || !$gameSystem.isInEnemyBook(enemy)) {
            this._enemySprite.bitmap = null;
            return;
        }
 
        var name = enemy.battlerName;
        var hue = enemy.battlerHue;
        var bitmap;
        if ($gameSystem.isSideView()) {
            bitmap = ImageManager.loadSvEnemy(name, hue);
        } else {
            bitmap = ImageManager.loadEnemy(name, hue);
        }
         
        this._enemySprite.bitmap = bitmap;
         
        this.resetTextColor();
 
        var rewardsWidth = 280;
        x = 1;
        y += lineHeight*1;
         
        if ($gameSwitches.value(ShowItems) === true || ShowItems === 0) {
        for (var j = 0; j < enemy.dropItems.length; j++) {
            var di = enemy.dropItems[j];
            if (di.kind > 0) {
                this.changeTextColor(this.systemColor());
                this.drawText(TextManager.item + ':', 1, 1);
                var item = Game_Enemy.prototype.itemObject(di.kind, di.dataId);
                this.drawItemName(item, x, y, rewardsWidth);
                y += lineHeight;
            }
            else{
                this.changeTextColor(this.systemColor());
                this.drawText(TextManager.item + ':', 1, 1);
                this.resetTextColor();
            }
        }
         
        this.resetTextColor();
        }
         
        x = (Graphics.boxWidth/3)*2 - this.textWidth(TextManager.expA) - 45
        y = (Graphics.boxHeight/5)*2 - lineHeight
         
        if ($gameSwitches.value(ShowEXP) === true || ShowEXP === 0) {
 
            this.changeTextColor(this.systemColor());
            this.drawText(TextManager.expA, x, y);
 
            this.resetTextColor();
            this.drawText(enemy.exp, x - this.textWidth(enemy.exp + ' '), y);
        }
         
        if ($gameSwitches.value(ShowGold) === true || ShowGold === 0) {
            this.changeTextColor(this.systemColor());
         
            if (goldIcon === 'true') {  
                this.drawIcon(Yanfly.Icon.Gold, x, y + lineHeight)
            } else {
                this.drawText(TextManager.currencyUnit, x, y + lineHeight);
            }
 
            this.resetTextColor();
            this.drawText(enemy.gold, x - this.textWidth(enemy.gold + ' '), y + lineHeight);
        }
 
    }
     
     
    Window_EnemyBookStatus3.prototype.refresh = function() {
         
        this.contents.clear();
         
        if ($gameSwitches.value(ShowStatus) === true || ShowStatus === 0) {
        var enemy = this._enemy;
        var x = 0;
        var y = 0;
        var lineHeight = this.lineHeight();
         
        if (!enemy || !$gameSystem.isInEnemyBook(enemy)) {
            return;
        }
             
            this.drawText('--- ' + TextManager.status + ' ---', (Graphics.boxWidth/3) - (this.textWidth('--- ' + TextManager.status + ' ---')/2), -10, 160);
            this.resetTextColor();  
 
        this.resetTextColor();
 
        x = (Graphics.boxWidth/3) - 235
        y = 25;
 
        var arr = [TextManager.param(0), TextManager.param(1), TextManager.param(2), TextManager.param(3)];
 
        var lgth = 0;
        var longest;
 
        for(var i=0; i < arr.length; i++){
            if(arr[i].length > lgth){
                var lgth = arr[i].length;
                longest = arr[i];
            }      
        }
         
        for (var i = 0; i < 4; i++) {
            this.changeTextColor(this.systemColor());
            this.drawText(TextManager.param(i), x, y, 160);
            this.resetTextColor();        
            this.drawText(enemy.params[i], x + this.textWidth(longest + '  '), y, 60, 'left');
            y += lineHeight;
        }
         
        y = 25;
         
        var arr = [TextManager.param(4), TextManager.param(5), TextManager.param(6), TextManager.param(7)];
 
        var lgth = 0;
        var longest2;
 
        for(var i=0; i < arr.length; i++){
            if(arr[i].length > lgth){
                var lgth = arr[i].length;
                longest2 = arr[i];
            }      
        }
         
        x = x + 10 + this.textWidth(longest + '  ') + 90
         
        for (var i = 4; i < 8; i++) {
            this.changeTextColor(this.systemColor());
            this.drawText(TextManager.param(i), x, y, 160);
            this.resetTextColor();
            this.drawText(enemy.params[i], x + this.textWidth(longest2 + '  '), y, 60, 'left');
            y += lineHeight;
        }
         
 
    }
    }
 
})();