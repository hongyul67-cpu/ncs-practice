/* ══════════════════════════════════════════════════════════════
   이 파일은 「NCS 직업기초능력 마스터」(ncs-master) 의 figs.js 를 그대로 복사한 것이다 (해설04 · 2026-10-01).
   두 도구가 같은 ncs-data.js 를 쓰므로 그림도 같은 것을 쓴다.
   ▸ 원본 그림을 고쳤으면 이 파일도 다시 복사한다(키 이름이 바뀌면 exfig.js 의 규칙도 고친다).
   ▸ 이 도구에서 그림을 어느 해설에 붙일지는 exfig.js 에 있다.
   ══════════════════════════════════════════════════════════════ */
/* ══════════════════════════════════════════════════════════════
   NCS 직업기초능력 마스터 — 그림 모음 (보조05 · 2026-10-01)
   공용 그리기 도우미 links/fig.js 를 쓴다. index.html(배우기) · lesson.js(수업 슬라이드)가 함께 부른다.

   한 칸의 모양
     키: { cap:'캡션 한 줄', cards:['영역키|카드 제목'…], draw:function(){ … } }
       cards — ncs-data.js 의 AREAS[영역키].learn[].title 과 **똑같이**. 그 카드를 펼치면 본문 위에 그림이 나온다.
               영역 배우기 화면 맨 위 「🖼️ 그림으로 먼저 보기」에는 그 영역 카드에 붙은 그림이 모두 나온다.
     순서 = 화면에 나오는 순서.

   ncs-data.js 는 ncs-practice 와 같은 파일이라 **고치지 않는다** — 그림 연결은 이 파일 쪽에서만 한다.
   그림 내용은 배우기 카드 본문(ncs-data.js)과 슬라이드 요점(lesson.js)을 옮긴 것이다.
   카드에 없는 예시(이름·점수·항목)를 넣은 그림은 캡션에 「예」라고 적었다.
   ans:true 이름표 = 슬라이드 빈칸·퀴즈의 답 → 슬라이드에서는 labels:false 로 ? 가 된다.
   ══════════════════════════════════════════════════════════════ */
var FIGS = (function () {
  var F = window.FIG;
  if (!F) return {};
  var C = F.C;
  var t = F.t, box = F.box, line = F.line, arrow = F.arrow, route = F.route, callout = F.callout,
    circle = F.circle, poly = F.poly, path = F.path, num = F.num;

  /* ── 작은 도우미 ── */
  function dot(x, y, r, c) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 3) + '" fill="' + (c || C.ink) + '"/>'; }
  function ell(cx, cy, rx, ry, o) {
    o = o || {};
    return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="' + (o.fill || 'none') +
      '" stroke="' + (o.c || C.ink) + '" stroke-width="' + (o.w || 1.6) + '"' + (o.op != null ? ' fill-opacity="' + o.op + '"' : '') + '/>';
  }
  /* 사람 — 머리(cx, cy) 기준 */
  function person(cx, cy, o) {
    o = o || {};
    var s = o.s || 1, c = o.c || C.ink, fill = o.fill || C.grayL;
    return circle(cx, cy, 11 * s, { fill: fill, c: c, w: 1.6 }) +
      path('M' + (cx - 17 * s) + ',' + (cy + 36 * s) + ' Q' + (cx - 17 * s) + ',' + (cy + 15 * s) + ' ' + cx + ',' + (cy + 15 * s) +
        ' Q' + (cx + 17 * s) + ',' + (cy + 15 * s) + ' ' + (cx + 17 * s) + ',' + (cy + 36 * s) + ' Z', { fill: fill, c: c, w: 1.6 });
  }
  function divider(x, y1, y2) { return line(x, y1, x, y2, { c: C.grayM, w: 1.4, dash: '6 5' }); }
  function strike(x1, x2, y, c) { return line(x1, y, x2, y, { c: c || C.red, w: 2 }); }
  function chevron(x, y, w, h, o) {
    o = o || {};
    var k = 14;
    return poly([[x, y], [x + w - k, y], [x + w, y + h / 2], [x + w - k, y + h], [x, y + h], [x + k, y + h / 2]],
      { close: 1, fill: o.fill || C.grayL, c: o.c || C.ink, w: 1.6 });
  }
  /* 문서 아이콘 — 왼쪽 위 (x, y), 60 × 76 */
  function doc(x, y, o) {
    o = o || {};
    var c = o.c || C.ink, s = poly([[x, y], [x + 44, y], [x + 60, y + 16], [x + 60, y + 76], [x, y + 76]], { close: 1, fill: o.fill || '#fff', c: c, w: 1.6 }) +
      poly([[x + 44, y], [x + 44, y + 16], [x + 60, y + 16]], { c: c, w: 1.2 });
    for (var i = 0; i < 4; i++) s += line(x + 10, y + 28 + i * 11, x + 50 - (i === 3 ? 16 : 0), y + 28 + i * 11, { c: C.line, w: 2 });
    return s;
  }

  var S = {};

  /* ═══════════════ 문제해결능력 ═══════════════ */

  S.solve4 = { cards: ['problem|문제해결능력이란?', 'problem|문제처리 · 분석기법 (SWOT)'],
    cap: '문제처리 4단계 — 문제 인식 → 원인 분석 → 대안 선택 → 실행 및 평가, 평가 결과는 다시 인식으로',
    draw: function () {
      var P = [[40, 40, '문제 인식', C.blue], [290, 40, '원인 분석', C.blue], [290, 166, '대안(해결안) 선택', C.blue], [40, 166, '실행 및 평가', C.blue]], s = '';
      for (var i = 0; i < 4; i++) {
        var p = P[i];
        s += box(p[0], p[1], 150, 58, { fill: i === 0 ? C.blueL : '#fff', c: C.blue }) + num(p[0] + 4, p[1] + 4, i + 1) +
          t(p[0] + 79, p[1] + 30, p[2], { a: 'm', b: 1, size: p[2].length > 6 ? 15 : 17, halo: false });
      }
      s += arrow(194, 69, 286, 69, { c: C.blue }) + arrow(365, 102, 365, 162, { c: C.blue }) + arrow(286, 195, 194, 195, { c: C.blue });
      s += arrow(115, 162, 115, 102, { c: C.green, dash: '6 4' }) + t(124, 132, '다시 인식', { size: 14, c: C.green, b: 1 });
      s += t(282, 132, '사고력 + 문제처리능력', { a: 'm', size: 14, c: C.sub });
      return F.svg(480, 244, s);
    } };

  S.ptype3 = { cards: ['problem|문제해결능력이란?'],
    cap: '문제의 3가지 유형 — 이미 벌어진 발생형 · 두면 커지는 탐색형 · 앞으로 만들 설정형',
    draw: function () {
      var s = '', X = [16, 172, 328], nm = ['발생형', '탐색형', '설정형'], cl = [C.red, C.orange, C.green],
        a = ['이미 일어난 문제', '개선 안 하면 커짐', '앞으로의 목표'], b = ['보이는 문제', '찾는 문제', '미래 문제'];
      for (var i = 0; i < 3; i++) {
        var x = X[i];
        s += t(x + 68, 30, nm[i], { a: 'm', b: 1, size: 18, c: cl[i] });
        s += line(x + 6, 176, x + 132, 176, { c: C.sub, w: 1.4 }) + line(x + 6, 176, x + 6, 56, { c: C.sub, w: 1.4 });
        s += line(x + 6, 112, x + 132, 112, { c: C.sub, w: 1.2, dash: '5 4' });
        if (i === 0) {
          s += t(x + 14, 124, '기준', { size: 13, c: C.sub });
          s += poly([[x + 12, 96], [x + 60, 98], [x + 122, 152]], { c: C.blue, w: 2.4 });
          s += arrow(x + 122, 115, x + 122, 149, { c: C.red, w: 1.6, both: true, head: 8 });
        } else if (i === 1) {
          s += poly([[x + 12, 92], [x + 70, 101]], { c: C.blue, w: 2.4 }) + poly([[x + 70, 101], [x + 126, 150]], { c: C.orange, w: 2.4, dash: '6 4' });
          s += line(x + 70, 60, x + 70, 172, { c: C.grayM, w: 1 }) + t(x + 70, 66, '지금', { a: 'm', size: 13, c: C.sub });
        } else {
          s += poly([[x + 12, 104], [x + 126, 104]], { c: C.blue, w: 2.4 }) + line(x + 60, 70, x + 130, 70, { c: C.green, w: 2, dash: '6 4' });
          s += arrow(x + 94, 101, x + 94, 75, { c: C.green, w: 1.8, head: 9 }) + t(x + 56, 70, '새 목표', { a: 'e', size: 13, c: C.green, b: 1 });
        }
        s += t(x + 68, 200, a[i], { a: 'm', size: 14 }) + t(x + 68, 222, '(' + b[i] + ')', { a: 'm', size: 13, c: C.sub });
      }
      return F.svg(480, 240, s);
    } };

  S.contra4 = { cards: ['problem|명제와 대우 — 논리의 기본기'],
    cap: '원명제가 참이면 대각선 맞은편의 대우만 반드시 참 — 역과 이는 알 수 없다',
    draw: function () {
      function cell(x, y, nm, fm, st, o) {
        return box(x, y, 150, 76, { fill: o.fill, c: o.c }) + t(x + 75, y + 18, nm, { a: 'm', b: 1, size: 16, c: o.c, halo: false }) +
          t(x + 75, y + 40, fm, { a: 'm', size: 18, halo: false }) + t(x + 75, y + 62, st, { a: 'm', size: 14, b: 1, c: o.sc || C.sub, halo: false, ans: o.ans });
      }
      var s = cell(30, 30, '원명제', 'p → q', '참이라고 하면', { fill: C.blueL, c: C.blue }) +
        cell(300, 30, '역', 'q → p', '알 수 없음', { fill: '#fff', c: C.sub, ans: 1 }) +
        cell(30, 176, '이', '~p → ~q', '알 수 없음', { fill: '#fff', c: C.sub, ans: 1 }) +
        cell(300, 176, '대우', '~q → ~p', '반드시 참', { fill: C.greenL, c: C.green, sc: C.green });
      s += arrow(184, 68, 296, 68, { c: C.sub, w: 1.6 }) + t(240, 55, '앞뒤 바꿈', { a: 'm', size: 13, c: C.sub });
      s += arrow(105, 110, 105, 172, { c: C.sub, w: 1.6 }) + t(114, 141, '둘 다 부정', { size: 13, c: C.sub });
      s += arrow(184, 108, 296, 178, { c: C.green, w: 2.2 }) + t(262, 130, '바꾸고 + 부정', { a: 'm', size: 14, c: C.green, b: 1 });
      return F.svg(480, 270, s);
    } };

  S.venn = { cards: ['problem|명제와 대우 — 논리의 기본기'],
    cap: '“비가 오면 땅이 젖는다” = 비가 오는 경우가 땅이 젖는 경우 안에 들어 있다',
    draw: function () {
      var s = box(8, 8, 464, 268, { fill: '#fff', c: C.grayM, w: 1.2, r: 10 });
      s += circle(240, 150, 115, { fill: C.blueL, c: C.blue, w: 1.8 }) + t(240, 58, '땅이 젖음 (q)', { a: 'm', b: 1, c: C.blue, halo: false });
      s += circle(200, 172, 52, { fill: C.greenL, c: C.green, w: 1.8 }) + t(200, 166, '비가 옴', { a: 'm', b: 1, c: C.green, halo: false }) +
        t(200, 188, '(p)', { a: 'm', size: 14, c: C.green, halo: false });
      s += dot(300, 118, 6, C.orange) + callout(300, 118, 350, 84, '스프링클러', { c: C.orange, b: 1 }) +
        t(466, 108, '젖었지만 비는 아님', { a: 'e', size: 13, c: C.sub }) + t(466, 128, '→ 역은 알 수 없다', { a: 'e', size: 13, c: C.orange, b: 1 });
      s += dot(30, 234, 6, C.ink) + t(42, 234, '땅이 안 젖음 →', { size: 14, b: 1 }) + t(42, 256, '비도 안 옴 (대우 ✔)', { size: 14, b: 1, c: C.green });
      return F.svg(480, 284, s);
    } };

  S.chain = { cards: ['problem|삼단논법 · 명제 연결'],
    cap: '방향이 안 맞는 전제는 대우로 뒤집어 잇는다 — 국어 → 영어 → 수학',
    draw: function () {
      function row(y, head, hc, a, b, fa, fb, ca, cb) {
        return t(14, y, head, { size: 13, b: 1, c: hc }) +
          box(84, y - 20, 132, 40, { fill: fa, c: ca, label: a, size: 15 }) + arrow(220, y, 266, y, { c: C.ink }) +
          box(270, y - 20, 132, 40, { fill: fb, c: cb, label: b, size: 15 });
      }
      var s = row(42, '전제 1', C.ink, '국어 좋아함', '영어 좋아함', C.blueL, C.orangeL, C.blue, C.orange);
      s += row(100, '전제 2', C.sub, '수학 싫어함', '영어 싫어함', C.grayL, C.grayL, C.sub, C.sub) + t(410, 100, '방향 ✗', { size: 13, c: C.red, b: 1 });
      s += row(158, '전제 2\n의 대우', C.green, '영어 좋아함', '수학 좋아함', C.orangeL, C.greenL, C.orange, C.green) + t(410, 158, '뒤집음', { size: 13, c: C.green, b: 1 });
      s += line(20, 190, 460, 190, { c: C.grayM, w: 1.2, dash: '5 4' });
      s += t(240, 212, '결론 — 국어를 좋아하면 수학을 좋아한다', { a: 'm', b: 1, size: 16 });
      s += box(24, 232, 110, 40, { fill: C.blueL, c: C.blue, label: '국어' }) + arrow(138, 252, 180, 252) +
        box(184, 232, 110, 40, { fill: C.orangeL, c: C.orange, label: '영어' }) + arrow(298, 252, 340, 252) +
        box(344, 232, 110, 40, { fill: C.greenL, c: C.green, label: '수학' });
      return F.svg(480, 288, s);
    } };

  S.liar = { cards: ['problem|참·거짓 (진실게임)'],
    cap: '서로 모순되는 두 진술을 먼저 찾는다 — 거짓말이 1명이면 그 둘 중 하나, 나머지는 참',
    draw: function () {
      var X = [80, 240, 400], nm = ['A', 'B', 'C'], say = ['“난 안 했어”', '“A가 했어”', '“난 안 했어”'], s = '';
      for (var i = 0; i < 3; i++) {
        s += box(X[i] - 70, 26, 140, 44, { fill: '#fff', c: C.sub, r: 14, label: say[i], size: 16, b: 0 }) +
          poly([[X[i] - 8, 70], [X[i], 84], [X[i] + 8, 70]], { fill: '#fff', c: C.sub, w: 1.6 }) + line(X[i] - 7, 70, X[i] + 7, 70, { c: '#fff', w: 3 });
        s += person(X[i], 110, { fill: i === 2 ? C.greenL : C.orangeL, c: i === 2 ? C.green : C.orange }) + t(X[i], 170, nm[i], { a: 'm', b: 1, size: 18 });
      }
      s += arrow(112, 130, 208, 130, { c: C.red, both: true }) + t(160, 114, '모순', { a: 'm', b: 1, c: C.red });
      s += t(160, 196, '둘 중 하나는 반드시 거짓', { a: 'm', size: 14, c: C.red, b: 1 });
      s += t(400, 196, '그러면 C는 참', { a: 'm', size: 14, c: C.green, b: 1 });
      s += t(240, 232, '① 모순쌍 찾기 → ② 나머지는 참 → ③ 대입해 확인', { a: 'm', size: 15, b: 1 });
      return F.svg(480, 254, s);
    } };

  S.seats = { cards: ['problem|조건추리 (순서 · 자리)'],
    cap: '조건을 칸 기호로 바꾼다 — 머릿속으로 말고 칸을 그려 채운다',
    draw: function () {
      var R = [['“바로 옆”', '붙어 있다'], ['“A가 B보다 앞”', '사이는 상관없음'], ['“A와 B 사이에 한 명”', '빈칸을 정확히 센다'], ['“양 끝이 아니다”', '가운데 자리만']], s = '';
      function cells(y, fill) {
        var o = '';
        for (var k = 0; k < 5; k++) {
          var f = fill[k] || [];
          o += box(236 + k * 46, y, 42, 38, { fill: f[1] || '#fff', c: f[2] || C.sub, r: 5, label: f[0] || '', size: 17 });
        }
        return o;
      }
      for (var i = 0; i < 4; i++) {
        var y = 18 + i * 58;
        s += t(16, y + 12, R[i][0], { size: 16, b: 1 }) + t(16, y + 33, R[i][1], { size: 13, c: C.sub });
      }
      s += cells(18, [0, ['A', C.blueL, C.blue], ['B', C.blueL, C.blue]]) + box(279, 14, 88, 46, { fill: 'none', c: C.blue, w: 2, r: 8 });
      s += cells(76, [['A', C.blueL, C.blue], 0, 0, ['B', C.blueL, C.blue]]) + arrow(262, 72, 374, 72, { c: C.sub, w: 1.4, head: 8 }) + t(318, 64, '…', { a: 'm', size: 16, c: C.sub });
      s += cells(134, [['A', C.blueL, C.blue], ['?', C.orangeL, C.orange], ['B', C.blueL, C.blue]]);
      s += cells(192, [['✗', C.redL, C.red], ['○', C.greenL, C.green], ['○', C.greenL, C.green], ['○', C.greenL, C.green], ['✗', C.redL, C.red]]);
      return F.svg(480, 246, s);
    } };

  S.swot = { cards: ['problem|문제처리 · 분석기법 (SWOT)'],
    cap: 'SWOT — 강점·약점(안) × 기회·위협(밖) 네 칸, 상황 키워드를 먼저 태그하면 전략이 보인다',
    draw: function () {
      var s = t(205, 36, '기회 (O)', { a: 'm', b: 1 }) + t(375, 36, '위협 (T)', { a: 'm', b: 1 }) +
        t(64, 95, '강점\n(S)', { a: 'm', b: 1 }) + t(64, 165, '약점\n(W)', { a: 'm', b: 1 });
      var CL = [['SO', '공격적', 120, 60], ['ST', '다양화', 290, 60], ['WO', '우회 · 보완', 120, 130], ['WT', '방어적', 290, 130]];
      for (var i = 0; i < 4; i++) {
        var c = CL[i], hi = i === 2;
        s += box(c[2], c[3], 170, 70, { fill: hi ? C.orangeL : '#fff', c: hi ? C.orange : C.sub, r: 4, w: hi ? 2.2 : 1.4 }) +
          t(c[2] + 85, c[3] + 24, c[0], { a: 'm', b: 1, size: 20, c: hi ? C.orange : C.ink, halo: false }) +
          t(c[2] + 85, c[3] + 50, c[1] + ' 전략', { a: 'm', size: 15, halo: false });
      }
      s += t(240, 226, '“브랜드는 약하고(W) 온라인 시장은 크는 중(O)”', { a: 'm', size: 15 }) +
        t(240, 250, '→ WO 전략 (약점을 보완하며 기회 활용)', { a: 'm', size: 15, b: 1, c: C.orange });
      return F.svg(480, 268, s);
    } };

  S.logic = { cards: ['problem|문제해결능력이란?', 'problem|문제처리 · 분석기법 (SWOT)'],
    cap: 'Logic Tree — 원인을 가지치기로 나눠 빠짐없이 본다 (공장 불량 예)',
    draw: function () {
      var s = box(16, 108, 112, 50, { fill: C.redL, c: C.red, label: '불량이 늘었다', size: 15 });
      var B = ['사람', '설비', '재료', '방법'], Y = [36, 94, 152, 210];
      for (var i = 0; i < 4; i++) {
        s += F.route([[128, 133], [150, 133], [150, Y[i]], [176, Y[i]]], { c: C.sub, w: 1.4, head: 8 }) +
          box(180, Y[i] - 20, 96, 40, { fill: i === 1 ? C.blueL : '#fff', c: i === 1 ? C.blue : C.sub, label: B[i], size: 16 });
      }
      s += F.route([[276, 94], [300, 94], [300, 64], [322, 64]], { c: C.blue, w: 1.4, head: 8 }) +
        F.route([[300, 94], [300, 124], [322, 124]], { c: C.blue, w: 1.4, head: 8 });
      s += box(326, 44, 136, 40, { fill: '#fff', c: C.blue, label: '공구가 닳았다', size: 15, b: 0 }) +
        box(326, 104, 136, 40, { fill: '#fff', c: C.blue, label: '정비를 빠뜨렸다', size: 15, b: 0 });
      s += t(394, 190, '가지를 끝까지', { a: 'm', size: 14, c: C.sub }) + t(394, 210, '나눠야 손댈 곳이 보인다', { a: 'm', size: 14, c: C.sub });
      return F.svg(480, 250, s);
    } };

  S.why5 = { cards: ['problem|문제해결능력이란?', 'problem|문제처리 · 분석기법 (SWOT)'],
    cap: '5 Why — “왜?”를 다섯 번 물어 겉원인이 아니라 근본원인까지 내려간다 (기계 정지 예)',
    draw: function () {
      var L = ['기계가 멈췄다', '모터에 과부하가 걸렸다', '베어링이 뻑뻑했다', '윤활유가 모자랐다', '급유를 빠뜨렸다', '급유 점검표가 없다'], s = '';
      for (var i = 0; i < 6; i++) {
        var x = 20 + i * 34, y = 14 + i * 46, last = i === 5, first = i === 0;
        s += box(x, y, 212, 36, { fill: last ? C.redL : (first ? C.grayL : '#fff'), c: last ? C.red : C.sub, w: last ? 2.2 : 1.4,
          label: L[i], size: 15, b: first || last ? 1 : 0, lc: last ? C.red : C.ink });
        if (i < 5) s += F.route([[x + 14, y + 36], [x + 14, y + 55], [x + 32, y + 55]], { c: C.orange, w: 1.6, head: 8 }) +
          t(x + 220, y + 18, '왜?', { size: 15, b: 1, c: C.orange });
      }
      s += t(296, 294, '↑ 근본원인', { a: 'm', size: 15, b: 1, c: C.red });
      s += t(470, 32, '겉으로 보인 문제', { a: 'e', size: 13, c: C.sub });
      return F.svg(480, 310, s);
    } };

  /* ═══════════════ 수리능력 ═══════════════ */

  S.ratio2 = { cards: ['math|수리능력이란?', 'math|비율 · 백분율 · 증감률'],
    cap: '비중은 전체로 나누고, 증감률은 처음값으로 나눈다 — 나중값으로 나누면 틀린다',
    draw: function () {
      var s = t(120, 26, '비중', { a: 'm', b: 1, size: 18, c: C.blue }) + t(360, 26, '증감률', { a: 'm', b: 1, size: 18, c: C.red }) + divider(240, 14, 262);
      /* 비중 — 600 중 150 */
      s += box(70, 60, 60, 150, { fill: '#fff', c: C.sub, r: 3 }) + box(70, 172.5, 60, 37.5, { fill: C.blueL, c: C.blue, r: 3 });
      s += callout(130, 191, 150, 191, '부분 150', { c: C.blue, tc: C.blue, b: 1 }) + callout(130, 70, 150, 70, '전체 600', { c: C.sub, b: 1 });
      s += t(120, 240, '150 ÷ 600 × 100 = 25%', { a: 'm', size: 15, b: 1 });
      /* 증감률 — 250 → 300 */
      s += box(286, 110, 50, 100, { fill: C.grayL, c: C.sub, r: 3 }) + box(378, 90, 50, 120, { fill: C.grayL, c: C.sub, r: 3 }) +
        box(378, 90, 50, 20, { fill: C.redL, c: C.red, r: 2 }) + line(336, 110, 378, 110, { c: C.sub, w: 1, dash: '4 3' });
      s += t(436, 100, '+50', { size: 15, b: 1, c: C.red }) + t(311, 224, '처음 250', { a: 'm', size: 13 }) + t(403, 224, '나중 300', { a: 'm', size: 13 });
      s += F.route([[378, 98], [350, 66], [311, 66], [311, 104]], { c: C.red, w: 1.6, head: 9 }) +
        t(330, 50, '처음값으로 나눈다', { a: 'm', size: 14, b: 1, c: C.red, ans: 1 });
      s += t(372, 250, '50 ÷ 250 × 100 =', { a: 'e', size: 15, b: 1 }) + t(378, 250, '20%', { size: 15, b: 1, c: C.red, ans: 1 });
      return F.svg(480, 270, s);
    } };

  S.updown = { cards: ['math|비율 · 백분율 · 증감률'],
    cap: '20% 올렸다가 20% 내리면 원래대로 안 돌아온다 — 100 × 1.2 × 0.8 = 96 (4% 감소)',
    draw: function () {
      var base = 220, k = 1.2, B = [[70, 100, '처음'], [205, 120, '20% 인상'], [340, 96, '20% 인하']], s = '';
      s += line(40, 100 * -k + base, 440, 100 * -k + base, { c: C.sub, w: 1.2, dash: '5 4' }) + t(34, 100 * -k + base, '100', { a: 'e', size: 13, c: C.sub });
      for (var i = 0; i < 3; i++) {
        var h = B[i][1] * k;
        s += box(B[i][0], base - h, 70, h, { fill: i === 2 ? C.orangeL : C.blueL, c: i === 2 ? C.orange : C.blue, r: 3 }) +
          t(B[i][0] + 35, base - h - 14, String(B[i][1]), { a: 'm', b: 1, size: 17 }) + t(B[i][0] + 35, base + 18, B[i][2], { a: 'm', size: 14 });
      }
      s += arrow(146, 90, 198, 70, { c: C.green, w: 1.8 }) + t(170, 64, '× 1.2', { a: 'm', size: 15, b: 1, c: C.green });
      s += arrow(281, 70, 333, 90, { c: C.red, w: 1.8 }) + t(310, 64, '× 0.8', { a: 'm', size: 15, b: 1, c: C.red });
      s += callout(410, 102, 432, 136, '4 모자람', { c: C.red, tc: C.red, b: 1, a: 'm' });
      s += t(240, 262, '할인은 (1 − 할인율), 인상은 (1 + 인상률)을 곱한다', { a: 'm', size: 14, c: C.sub });
      return F.svg(480, 278, s);
    } };

  S.dst = { cards: ['math|거리·속력·시간 / 농도 / 일률'],
    cap: '거리 · 속력 · 시간 — 구할 칸을 가리면 나머지 둘의 관계가 보인다 (단위부터 맞춘다)',
    draw: function () {
      var s = poly([[30, 222], [250, 222], [140, 34]], { close: 1, fill: C.blueL, c: C.blue, w: 2.2 });
      s += line(76, 144, 204, 144, { c: C.blue, w: 1.8 }) + line(140, 144, 140, 222, { c: C.blue, w: 1.8 });
      s += t(140, 108, '거리', { a: 'm', b: 1, size: 20, halo: false }) + t(96, 188, '속력', { a: 'm', b: 1, size: 18, halo: false }) +
        t(184, 188, '시간', { a: 'm', b: 1, size: 18, halo: false });
      s += t(270, 60, '거리 = 속력 × 시간', { size: 16, b: 1 }) + t(270, 96, '속력 = 거리 ÷ 시간', { size: 16 }) + t(270, 132, '시간 = 거리 ÷ 속력', { size: 16 });
      s += box(264, 160, 200, 62, { fill: '#fff', c: C.orange }) + t(364, 180, '2시간 30분 = 2.5시간', { a: 'm', size: 13, c: C.orange, b: 1, halo: false }) +
        t(364, 204, '60 × 2.5 = 150 km', { a: 'm', size: 16, b: 1, halo: false });
      return F.svg(480, 244, s);
    } };

  S.salt = { cards: ['math|거리·속력·시간 / 농도 / 일률'],
    cap: '섞어도 소금의 양은 그대로 — 소금끼리 더하고 전체 무게로 나눈다 (8% 300g + 12% 200g)',
    draw: function () {
      function beaker(x, w, lv, g, p, salt) {
        var o = box(x, 200 - lv, w, lv, { fill: C.blueL, c: 'none', r: 2 }) +
          path('M' + x + ',58 V192 Q' + x + ',200 ' + (x + 8) + ',200 H' + (x + w - 8) + ' Q' + (x + w) + ',200 ' + (x + w) + ',192 V58', { c: C.ink, w: 2 });
        o += t(x + w / 2, 200 - lv / 2 - 10, g, { a: 'm', b: 1, size: 16, halo: false }) + t(x + w / 2, 200 - lv / 2 + 12, p, { a: 'm', size: 15, halo: false, c: C.blue });
        return o + t(x + w / 2, 222, salt, { a: 'm', size: 15, b: 1, c: C.orange });
      }
      var s = t(240, 28, '섞어도 소금의 양은 그대로', { a: 'm', b: 1, size: 17, ans: 1 });
      s += beaker(24, 110, 90, '300 g', '8%', '소금 24 g') + t(158, 140, '+', { a: 'm', size: 26, b: 1 });
      s += beaker(184, 92, 60, '200 g', '12%', '소금 24 g') + t(302, 140, '=', { a: 'm', size: 26, b: 1 });
      s += beaker(326, 132, 130, '500 g', '?', '소금 48 g');
      s += t(262, 254, '48 ÷ 500 × 100 =', { a: 'e', size: 16, b: 1 }) + t(268, 254, '9.6%', { size: 16, b: 1, c: C.blue, ans: 1 });
      return F.svg(480, 274, s);
    } };

  S.work = { cards: ['math|거리·속력·시간 / 농도 / 일률'],
    cap: '일률 — 전체 일을 1(12칸)로 놓으면 A는 하루 2칸, B는 하루 1칸, 함께 하루 3칸 → 4일',
    draw: function () {
      var x0 = 42, w = 33, s = '';
      function row(y, fill) {
        var o = '';
        for (var i = 0; i < 12; i++) o += box(x0 + i * w, y, w - 3, 30, { fill: fill[i] || '#fff', c: C.grayM, r: 3, w: 1.2 });
        return o;
      }
      var A = [], B = [], T = [];
      A[0] = A[1] = C.blueL; B[0] = C.orangeL;
      for (var d = 0; d < 4; d++) { T[d * 3] = T[d * 3 + 1] = C.blueL; T[d * 3 + 2] = C.orangeL; }
      s += t(x0, 28, 'A 혼자 6일 → 하루 1/6 = 2칸', { size: 15, b: 1, c: C.blue }) + row(40, A);
      s += t(x0, 94, 'B 혼자 12일 → 하루 1/12 = 1칸', { size: 15, b: 1, c: C.orange }) + row(106, B);
      s += t(x0, 160, '함께 — 하루 3칸', { size: 15, b: 1 }) + row(172, T);
      for (d = 0; d < 4; d++) {
        var a = x0 + d * 3 * w, b = a + 3 * w - 3;
        s += line(a, 210, b, 210, { c: C.ink, w: 1.4 }) + line(a, 205, a, 210, { c: C.ink, w: 1.4 }) + line(b, 205, b, 210, { c: C.ink, w: 1.4 }) +
          t((a + b) / 2, 226, (d + 1) + '일', { a: 'm', size: 14, b: 1 });
      }
      s += t(240, 258, '1/6 + 1/12 = 3/12 = 1/4 → 4일', { a: 'm', size: 16, b: 1, c: C.green });
      return F.svg(480, 276, s);
    } };

  S.mulsum = { cards: ['math|경우의 수 · 확률'],
    cap: '“그리고”는 곱한다(가지가 갈라진다) · “또는”은 더한다(한 줄에서 하나를 고른다)',
    draw: function () {
      var s = t(120, 26, '그리고 → 곱하기', { a: 'm', b: 1, size: 17, c: C.blue }) + t(362, 26, '또는 → 더하기', { a: 'm', b: 1, size: 17, c: C.orange }) + divider(246, 12, 262);
      s += dot(24, 140, 5);
      var Y = [72, 140, 208];
      for (var i = 0; i < 3; i++) {
        s += line(24, 140, 80, Y[i], { c: C.blue, w: 1.6 }) + circle(92, Y[i], 14, { fill: C.blueL, c: C.blue, label: '상' + (i + 1), size: 13 });
        for (var j = 0; j < 2; j++) {
          var yy = Y[i] + (j ? 16 : -16);
          s += line(106, Y[i], 150, yy, { c: C.sub, w: 1.2 }) + box(152, yy - 11, 38, 22, { fill: '#fff', c: C.sub, r: 4, label: '하' + (j + 1), size: 13, b: 0 });
        }
      }
      s += t(218, 140, '6', { a: 'm', b: 1, size: 20, c: C.blue });
      s += t(120, 248, '상의 3 × 하의 2 = 6가지', { a: 'm', size: 15, b: 1 });
      var L = ['버스 ①', '버스 ②', '지하철 ①', '지하철 ②', '지하철 ③'];
      for (i = 0; i < 5; i++) s += box(300, 48 + i * 36, 110, 30, { fill: i < 2 ? C.orangeL : C.greenL, c: i < 2 ? C.orange : C.green, label: L[i], size: 14 });
      s += path('M418,52 Q430,52 430,64 V210 Q430,222 418,222', { c: C.ink, w: 1.4 }) + t(452, 137, '5', { a: 'm', b: 1, size: 20, c: C.orange });
      s += t(362, 248, '버스 2 + 지하철 3 = 5가지', { a: 'm', size: 15, b: 1 });
      return F.svg(480, 268, s);
    } };

  S.dice36 = { cards: ['math|경우의 수 · 확률'],
    cap: '주사위 2개 = 6 × 6 = 36가지, 눈의 합이 7인 칸은 대각선 6칸 → 6/36 = 1/6',
    draw: function () {
      var x0 = 222, y0 = 48, w = 36, s = t(x0 + 3 * w, 26, '두 번째 주사위', { a: 'm', size: 13, c: C.sub });
      s += t(x0 - 34, y0 + 3 * w, '첫\n번\n째', { a: 'm', size: 13, c: C.sub });
      for (var i = 0; i < 6; i++) {
        s += t(x0 + i * w + w / 2, y0 - 8, String(i + 1), { a: 'm', size: 14, b: 1 }) + t(x0 - 12, y0 + i * w + w / 2, String(i + 1), { a: 'm', size: 14, b: 1 });
        for (var j = 0; j < 6; j++) {
          var sum = i + j + 2, hi = sum === 7;
          s += box(x0 + j * w, y0 + i * w, w - 2, w - 2, { fill: hi ? C.orangeL : '#fff', c: hi ? C.orange : C.grayM, r: 3, w: hi ? 1.8 : 1,
            label: String(sum), size: 14, b: hi ? 1 : 0, lc: hi ? C.orange : C.sub });
        }
      }
      s += t(20, 90, '전체', { size: 15, c: C.sub }) + t(20, 114, '6 × 6 = 36', { size: 17, b: 1 });
      s += t(20, 158, '합이 7', { size: 15, c: C.orange }) + t(20, 182, '6칸', { size: 17, b: 1, c: C.orange });
      s += t(20, 232, '6/36 = 1/6', { size: 18, b: 1, c: C.blue });
      return F.svg(480, 274, s);
    } };

  S.permcomb = { cards: ['math|경우의 수 · 확률'],
    cap: '순서가 있으면 AB 와 BA 는 다른 경우(5 × 4 = 20) · 뽑기만 하면 같은 짝이라 2로 나눈다(10)',
    draw: function () {
      var s = '', P = ['A', 'B', 'C', 'D', 'E'];
      for (var i = 0; i < 5; i++) s += circle(140 + i * 50, 34, 16, { fill: i < 2 ? C.blueL : C.grayL, c: i < 2 ? C.blue : C.sub, label: P[i], size: 15 });
      s += t(114, 34, '5명', { a: 'e', size: 14, c: C.sub });
      s += divider(240, 70, 250);
      s += t(122, 86, '일렬로 세우기 (순서 O)', { a: 'm', b: 1, size: 15, c: C.blue });
      s += t(66, 108, '1번', { a: 'm', size: 13, c: C.sub }) + t(122, 108, '2번', { a: 'm', size: 13, c: C.sub });
      s += box(42, 118, 48, 34, { fill: C.blueL, c: C.blue, label: 'A' }) + box(98, 118, 48, 34, { fill: C.blueL, c: C.blue, label: 'B' });
      s += box(42, 162, 48, 34, { fill: C.blueL, c: C.blue, label: 'B' }) + box(98, 162, 48, 34, { fill: C.blueL, c: C.blue, label: 'A' });
      s += t(158, 146, '서로 다른', { size: 14, b: 1, c: C.blue }) + t(158, 166, '2가지', { size: 14, b: 1, c: C.blue });
      s += t(122, 230, '5 × 4 = 20가지', { a: 'm', b: 1, size: 16 });
      s += t(360, 86, '대표 2명 뽑기 (순서 X)', { a: 'm', b: 1, size: 15, c: C.green });
      s += box(300, 118, 120, 78, { fill: C.greenL, c: C.green, r: 16 }) + t(360, 146, 'A · B', { a: 'm', b: 1, size: 20, halo: false }) +
        t(360, 176, '같은 짝 1가지', { a: 'm', size: 14, c: C.green, b: 1, halo: false });
      s += t(360, 230, '20 ÷ 2 = 10가지', { a: 'm', b: 1, size: 16 });
      return F.svg(480, 256, s);
    } };

  S.amtrate = { cards: ['math|자료해석 (표·그래프)'],
    cap: '늘어난 양이 크다고 증가율도 큰 것은 아니다 — 율을 물으면 처음값으로 나눠 비교한다',
    draw: function () {
      var base = 196, k = 0.25, s = '';
      s += box(24, 18, 14, 14, { fill: C.redL, c: C.red, r: 2, w: 1.2 }) + t(44, 25, '늘어난 양', { size: 14, c: C.red, b: 1 });
      function pair(x, a, b, nm) {
        var o = box(x, base - a * k, 46, a * k, { fill: C.grayL, c: C.sub, r: 3 }) + box(x + 60, base - b * k, 46, b * k, { fill: C.grayL, c: C.sub, r: 3 }) +
          box(x + 60, base - b * k, 46, (b - a) * k, { fill: C.redL, c: C.red, r: 2 });
        o += t(x + 23, base - a * k - 12, String(a), { a: 'm', size: 14 }) + t(x + 83, base - b * k - 12, String(b), { a: 'm', size: 14 });
        return o + t(x + 53, base + 20, nm, { a: 'm', b: 1, size: 16 });
      }
      s += pair(56, 500, 600, '가') + pair(290, 200, 260, '나');
      s += line(20, base, 460, base, { c: C.ink, w: 1.4 });
      s += t(109, 244, '양 +100', { a: 'm', size: 16, b: 1, c: C.red, ans: 1 }) + t(343, 244, '양 +60', { a: 'm', size: 16, b: 1, c: C.red, ans: 1 });
      s += t(109, 270, '율 100 ÷ 500 = 20%', { a: 'm', size: 15, b: 1, ans: 1 }) + t(343, 270, '율 60 ÷ 200 = 30%', { a: 'm', size: 15, b: 1, c: C.green, ans: 1 });
      s += t(226, 244, '양은 가', { a: 'm', size: 13, c: C.sub }) + t(226, 270, '율은 나', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 290, s);
    } };

  S.stat3 = { cards: ['math|기초 통계 (평균·중앙값·최빈값)'],
    cap: '2, 3, 3, 5, 7 — 평균 4 · 중앙값 3 · 최빈값 3, 셋은 같은 값이 아닐 수 있다',
    draw: function () {
      function X(v) { return 40 + (v - 1) * 55; }
      var s = line(24, 172, 456, 172, { c: C.ink, w: 1.6 });
      for (var v = 1; v <= 8; v++) s += line(X(v), 167, X(v), 177, { c: C.ink, w: 1.4 }) + t(X(v), 190, String(v), { a: 'm', size: 14, c: C.sub });
      var D = [[2, 0], [3, 0], [3, 1], [5, 0], [7, 0]];
      for (var i = 0; i < D.length; i++) s += circle(X(D[i][0]), 152 - D[i][1] * 26, 11, { fill: C.grayL, c: C.ink, w: 1.4 });
      s += t(X(3), 38, '중앙값 3', { a: 'm', b: 1, c: C.orange }) + t(X(3), 60, '최빈값 3', { a: 'm', b: 1, c: C.green });
      s += arrow(X(3), 74, X(3), 106, { c: C.orange, w: 1.6, head: 9 });
      s += t(300, 44, '가운데(3번째) 값', { size: 13, c: C.orange }) + t(300, 64, '가장 많이(2번) 나온 값', { size: 13, c: C.green });
      s += poly([[X(4), 198], [X(4) - 11, 216], [X(4) + 11, 216]], { close: 1, fill: C.blueL, c: C.blue, w: 1.6 });
      s += t(X(4), 236, '평균 4', { a: 'm', b: 1, c: C.blue }) + t(X(4), 258, '합 20 ÷ 개수 5', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 274, s);
    } };

  S.avgback = { cards: ['math|기초 통계 (평균·중앙값·최빈값)'],
    cap: '평균을 거꾸로 — 합 = 평균 × 개수, 4과목 합 320 에 90 을 더해 5로 나누면 82',
    draw: function () {
      var base = 226, k = 1.8, s = '';
      for (var i = 0; i < 4; i++) s += box(30 + i * 58, base - 80 * k, 48, 80 * k, { fill: C.blueL, c: C.blue, r: 3 }) + t(54 + i * 58, base + 16, (i + 1) + '과목', { a: 'm', size: 13 });
      s += box(270, base - 90 * k, 48, 90 * k, { fill: C.orangeL, c: C.orange, r: 3 }) + t(294, base + 16, '5과목', { a: 'm', size: 13 }) + t(294, base - 90 * k - 12, '90', { a: 'm', b: 1, c: C.orange });
      s += path('M30,' + (base - 80 * k - 10) + ' V' + (base - 80 * k - 18) + ' H254 V' + (base - 80 * k - 10), { c: C.blue, w: 1.4 }) +
        t(142, base - 80 * k - 30, '평균 80 × 4 = 합 320', { a: 'm', b: 1, size: 15, c: C.blue });
      s += line(24, base - 82 * k, 330, base - 82 * k, { c: C.green, w: 1.8, dash: '6 4' });
      s += t(344, 88, '320 + 90 = 410', { size: 16, b: 1 }) + t(344, 118, '410 ÷ 5', { size: 16, b: 1 }) + t(344, 148, '= 82점', { size: 18, b: 1, c: C.green });
      s += t(344, 186, '--- 새 평균', { size: 13, c: C.green });
      return F.svg(480, 254, s);
    } };

  /* ═══════════════ 의사소통능력 ═══════════════ */

  S.thing = { cards: ['comm|의사소통능력이란?', 'comm|높임법 (경어법)'],
    cap: '‘-시-’는 사람을 높이는 말 — 커피·사이즈 같은 사물에는 붙이지 않는다',
    draw: function () {
      var s = person(70, 34, { fill: C.greenL, c: C.green, s: 0.9 }) + t(96, 44, '손님 = 사람 → 높인다', { size: 14, b: 1, c: C.green });
      s += '<path d="M268,30 H314 L308,72 H274 Z" fill="#fff" stroke="' + C.ink + '" stroke-width="1.8"/>' +
        path('M314,40 Q330,42 328,54 Q326,64 310,62', { c: C.ink, w: 1.8 }) + path('M282,24 Q286,16 282,10 M296,24 Q300,16 296,10', { c: C.sub, w: 1.4 });
      s += t(340, 34, '커피 = 사물', { size: 14, b: 1, c: C.red }) + t(340, 54, '→ 높이지 않는다', { size: 14, b: 1, c: C.red });
      var W = [['손님,', 58], ['주문하신', 150], ['커피', 252], ['나왔습니다', 360]];
      for (var i = 0; i < 4; i++) s += t(W[i][1], 130, W[i][0], { a: 'm', size: 22, b: 1, c: i === 1 ? C.green : (i === 3 ? C.blue : C.ink) });
      s += F.route([[92, 84], [150, 84], [150, 110]], { c: C.green, w: 1.6, head: 9 }) + F.route([[300, 84], [360, 84], [360, 110]], { c: C.red, w: 1.6, head: 9 });
      s += line(20, 162, 460, 162, { c: C.grayM, w: 1.2, dash: '5 4' });
      var X = [['나오셨습니다', '나왔습니다', 86], ['없으십니다', '없습니다', 240], ['품절이십니다', '품절입니다', 394]];
      for (i = 0; i < 3; i++) {
        var wd = X[i][0].length * 15;
        s += t(X[i][2], 190, X[i][0] + ' ✗', { a: 'm', size: 15, c: C.red }) + strike(X[i][2] - wd / 2 - 6, X[i][2] + wd / 2 - 6, 190) +
          t(X[i][2], 220, X[i][1] + ' ✔', { a: 'm', size: 15, b: 1, c: C.green });
      }
      return F.svg(480, 240, s);
    } };

  S.jihyang = { cards: ['comm|어휘 — 뜻과 헷갈리는 말'],
    cap: '지향은 목표로 나아가고 지양은 피해 간다 · 기여는 좋은 일에, 야기·초래는 나쁜 일에 쓴다',
    draw: function () {
      var s = divider(292, 14, 246);
      s += t(24, 30, '지향 = 목표로 나아감', { size: 16, b: 1, c: C.blue });
      s += circle(236, 74, 30, { fill: '#fff', c: C.blue }) + circle(236, 74, 19, { fill: C.blueL, c: C.blue }) + circle(236, 74, 8, { fill: C.blue, c: C.blue });
      s += arrow(26, 74, 226, 74, { c: C.blue, w: 2.4 }) + t(40, 100, '예) 평화 지향', { size: 14, c: C.sub });
      s += t(24, 146, '지양 = 하지 않고 피함', { size: 16, b: 1, c: C.red });
      s += box(214, 170, 60, 48, { fill: C.redL, c: C.red, label: '낭비', size: 15 });
      s += F.route([[26, 194], [150, 194], [184, 238]], { c: C.red, w: 2.4 }) + t(40, 222, '예) 낭비 지양', { size: 14, c: C.sub });
      s += t(382, 30, '문장 분위기로 고른다', { a: 'm', size: 14, b: 1, c: C.sub });
      s += box(308, 48, 150, 74, { fill: C.greenL, c: C.green }) + t(383, 74, '기여 (+)', { a: 'm', b: 1, size: 18, c: C.green, halo: false }) +
        t(383, 100, '도움을 줌', { a: 'm', size: 14, halo: false });
      s += box(308, 148, 150, 74, { fill: C.redL, c: C.red }) + t(383, 174, '야기 · 초래 (−)', { a: 'm', b: 1, size: 17, c: C.red, halo: false }) +
        t(383, 200, '나쁜 일을 일으킴', { a: 'm', size: 14, halo: false });
      return F.svg(480, 256, s);
    } };

  S.doedwae = { cards: ['comm|맞춤법 · 띄어쓰기'],
    cap: '되/돼 — 그 자리에 ‘되어’를 넣어 말이 되면 ‘돼’ · 의존명사(수·것·만큼)는 앞말과 띄어 쓴다',
    draw: function () {
      var s = box(16, 42, 112, 50, { fill: C.grayL, c: C.sub, label: '안 □요', size: 18 });
      s += arrow(130, 67, 166, 67) + poly([[240, 30], [314, 67], [240, 104], [166, 67]], { close: 1, fill: C.orangeL, c: C.orange, w: 1.8 }) +
        t(240, 58, '‘되어’ 넣어', { a: 'm', size: 14, b: 1, halo: false }) + t(240, 78, '말이 되나?', { a: 'm', size: 14, b: 1, halo: false });
      s += arrow(316, 67, 348, 67, { c: C.green }) + t(332, 54, '예', { a: 'm', size: 13, c: C.green, b: 1 });
      s += box(352, 38, 112, 58, { fill: C.greenL, c: C.green }) + t(408, 58, '돼', { a: 'm', b: 1, size: 20, c: C.green, halo: false }) +
        t(408, 82, '안 돼요 (=되어요)', { a: 'm', size: 13, halo: false });
      s += arrow(240, 106, 240, 128, { c: C.sub }) + t(250, 117, '아니오', { size: 13, c: C.sub });
      s += box(190, 130, 100, 36, { fill: '#fff', c: C.sub, label: '되', size: 18 });
      s += line(16, 184, 464, 184, { c: C.grayM, w: 1.2, dash: '5 4' });
      s += t(16, 206, '띄어쓰기 — 의존명사는 띄운다', { size: 15, b: 1 });
      function vm(x, y, words) {
        var o = '', cx = x;
        for (var i = 0; i < words.length; i++) {
          o += t(cx, y, words[i], { size: 18, b: 1 });
          cx += words[i].length * 18 + 2;
          if (i < words.length - 1) { o += t(cx + 1, y + 2, '∨', { size: 16, b: 1, c: C.red }); cx += 16; }
        }
        return o;
      }
      s += vm(22, 240, ['할', '수', '있다']) + vm(170, 240, ['먹을', '만큼']) + vm(318, 240, ['아는', '것']);
      s += t(16, 270, '조사(뿐·만·대로)는 붙인다 — 너뿐이야', { size: 13, c: C.sub });
      return F.svg(480, 288, s);
    } };

  S.honor3 = { cards: ['comm|높임법 (경어법)'],
    cap: '높임법 세 가지 — 문장의 주어(주체) · 목적어(객체) · 듣는 사람(상대) 중 누구를 높이나',
    draw: function () {
      var s = box(110, 16, 260, 128, { fill: C.yellowL, c: C.sub, r: 18 }) + poly([[130, 138], [96, 176], [158, 142]], { fill: C.yellowL, c: C.sub, w: 1.6 }) +
        line(132, 143, 156, 143, { c: C.yellowL, w: 4 });
      s += person(180, 36, { fill: C.blueL, c: C.blue, s: 0.8 }) + person(300, 36, { fill: C.greenL, c: C.green, s: 0.8 });
      s += t(180, 90, '① 주체 높임', { a: 'm', size: 15, b: 1, c: C.blue, halo: false }) + t(180, 112, '께서 · -(으)시-', { a: 'm', size: 14, halo: false });
      s += t(300, 90, '② 객체 높임', { a: 'm', size: 15, b: 1, c: C.green, halo: false }) + t(300, 112, '드리다 · 모시다', { a: 'm', size: 14, halo: false });
      s += t(180, 132, '문장의 주어', { a: 'm', size: 13, c: C.sub, halo: false }) + t(300, 132, '목적어 · 부사어', { a: 'm', size: 13, c: C.sub, halo: false });
      s += person(60, 162, { s: 0.9 }) + t(60, 214, '나 (말하는 사람)', { a: 'm', size: 13 });
      s += person(420, 162, { fill: C.orangeL, c: C.orange, s: 0.9 }) + t(420, 214, '듣는 사람', { a: 'm', size: 13 });
      s += arrow(96, 186, 390, 186, { c: C.orange, w: 2 }) + t(240, 174, '③ 상대 높임', { a: 'm', size: 15, b: 1, c: C.orange }) +
        t(240, 204, '-습니다 · -요', { a: 'm', size: 14 });
      s += t(240, 242, '예) 할머니께서 주무신다 · 할머니를 모시고 · 안녕히 가십시오', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 260, s);
    } };

  S.signs = { cards: ['comm|독해 — 접속어와 중심내용'],
    cap: '접속어는 글의 길 표지 — 그래서는 직진, 그러나는 방향이 바뀐다(뒤에 진짜 하고 싶은 말)',
    draw: function () {
      var R = [['그래서 · 따라서 · 그러므로', '원인 → 결과'], ['그러나 · 하지만 · 반면', '반대 (역접)'], ['그리고 · 또한 · 게다가', '덧붙임'],
        ['예를 들어 · 가령', '예시'], ['즉 · 다시 말해', '바꿔 말함']], s = '';
      for (var i = 0; i < 5; i++) {
        var y = 14 + i * 48, cx = 44, cy = y + 20, red = i === 1, c = red ? C.red : C.blue;
        s += box(cx - 22, cy - 20, 44, 40, { fill: red ? C.redL : C.blueL, c: c, r: 8 });
        if (i === 0) s += arrow(cx - 13, cy, cx + 14, cy, { c: c, w: 2.6, head: 10 });
        else if (i === 1) s += F.route([[cx + 12, cy + 12], [cx + 12, cy - 8], [cx - 10, cy - 8], [cx - 10, cy + 10]], { c: c, w: 2.6, head: 9 });
        else if (i === 2) s += line(cx - 11, cy, cx + 11, cy, { c: c, w: 3 }) + line(cx, cy - 11, cx, cy + 11, { c: c, w: 3 });
        else if (i === 3) s += line(cx - 14, cy - 8, cx + 14, cy - 8, { c: c, w: 2.4 }) + F.route([[cx - 2, cy - 8], [cx - 2, cy + 6], [cx + 12, cy + 6]], { c: c, w: 2.2, head: 8 });
        else s += line(cx - 11, cy - 5, cx + 11, cy - 5, { c: c, w: 3 }) + line(cx - 11, cy + 5, cx + 11, cy + 5, { c: c, w: 3 });
        s += t(80, cy, R[i][0], { size: 16, b: 1, c: red ? C.red : C.ink }) + t(464, cy, R[i][1], { a: 'e', size: 15, b: red ? 1 : 0, c: red ? C.red : C.sub });
      }
      return F.svg(480, 256, s);
    } };

  S.topicpos = { cards: ['comm|독해 — 접속어와 중심내용'],
    cap: '중심 내용 찾기 — ‘따라서’ 뒤 · ‘그러나’ 뒤 · 마지막 문장을 먼저 본다, 예시·숫자는 뒷받침일 뿐',
    draw: function () {
      function bar(x, y, w, hi) { return box(x, y - 6, w, 12, { fill: hi ? C.blue : C.grayM, c: 'none', r: 6 }); }
      var s = t(20, 26, '문단 1', { size: 13, c: C.sub });
      s += bar(20, 48, 280) + bar(20, 70, 250) + bar(20, 92, 270);
      s += box(20, 108, 60, 26, { fill: C.orangeL, c: C.orange, label: '따라서', size: 13, r: 13 }) + bar(88, 121, 220, 1);
      s += callout(304, 70, 332, 70, '예시 · 숫자', { c: C.sub }) + t(338, 90, '= 뒷받침', { size: 13, c: C.sub });
      s += callout(312, 121, 332, 121, '주제 (결론)', { c: C.blue, tc: C.blue, b: 1 });
      s += line(20, 150, 460, 150, { c: C.grayM, w: 1.2, dash: '5 4' });
      s += t(20, 172, '문단 2', { size: 13, c: C.sub });
      s += bar(20, 194, 270) + bar(20, 216, 200);
      s += box(226, 203, 60, 26, { fill: C.redL, c: C.red, label: '그러나', size: 13, r: 13 }) + bar(20, 244, 250, 1);
      s += callout(274, 244, 300, 244, '진짜 하고 싶은 말', { c: C.blue, tc: C.blue, b: 1 });
      return F.svg(480, 268, s);
    } };

  S.docflow = { cards: ['comm|문서 이해와 작성'],
    cap: '기안문은 안에서 결재를 올리는 초안 → 결재가 나면 시행문으로 밖에 보내고, 공고문은 널리 알린다',
    draw: function () {
      var s = box(12, 24, 316, 150, { fill: 'none', c: C.sub, w: 1.4, dash: '6 5', r: 12 }) + t(24, 40, '기관 안', { size: 13, c: C.sub, b: 1 });
      s += doc(36, 58, { c: C.blue }) + t(66, 152, '기안문', { a: 'm', b: 1, c: C.blue });
      s += arrow(100, 96, 136, 96, { c: C.ink }) + circle(166, 96, 26, { fill: '#fff', c: C.red, w: 2.4, label: '결재', size: 15, lc: C.red }) +
        t(166, 144, '윗사람 승인', { a: 'm', size: 13, c: C.sub });
      s += arrow(196, 96, 232, 96, { c: C.ink }) + doc(238, 58, { c: C.green }) + t(268, 152, '시행문', { a: 'm', b: 1, c: C.green });
      s += arrow(302, 96, 358, 96, { c: C.green, w: 2.4 }) + box(362, 70, 104, 52, { fill: C.greenL, c: C.green, label: '다른 기관', size: 15 });
      s += doc(36, 192, { c: C.orange }) + t(112, 222, '공고문', { b: 1, c: C.orange }) + t(112, 244, '널리 알린다', { size: 13, c: C.sub });
      s += arrow(212, 232, 276, 232, { c: C.orange, w: 2.4 });
      for (var i = 0; i < 4; i++) s += person(306 + i * 44, 214, { s: 0.75, fill: C.orangeL, c: C.orange });
      return F.svg(480, 284, s);
    } };

  S.dugwal = { cards: ['comm|문서 이해와 작성'],
    cap: '두괄식 — 결론을 맨 앞에 둔다. 바쁜 사람도 첫 줄만 보고 핵심을 안다 (보고서 · 기획서)',
    draw: function () {
      function page(x, first) {
        var o = box(x, 44, 180, 196, { fill: '#fff', c: C.ink, r: 6 }), y = 60;
        var items = first ? ['결론', '근거 ①', '근거 ②', '근거 ③'] : ['근거 ①', '근거 ②', '근거 ③', '결론'];
        for (var i = 0; i < 4; i++) {
          var isC = items[i] === '결론';
          if (isC) { o += box(x + 14, y, 152, 40, { fill: first ? C.blueL : C.grayL, c: first ? C.blue : C.sub, label: '결론', size: 17, lc: first ? C.blue : C.sub }); y += 52; }
          else { o += t(x + 16, y + 10, items[i], { size: 14, c: C.sub }) + line(x + 76, y + 10, x + 164, y + 10, { c: C.grayM, w: 6 }); y += 36; }
        }
        return o;
      }
      var s = page(34, 1) + page(266, 0);
      s += t(124, 26, '두괄식 ✔', { a: 'm', b: 1, size: 17, c: C.green }) + t(356, 26, '결론이 끝에 오면', { a: 'm', b: 1, size: 16, c: C.sub });
      s += t(124, 262, '첫 줄만 봐도 핵심이 보인다', { a: 'm', size: 14, b: 1, c: C.blue }) + t(356, 262, '끝까지 읽어야 안다', { a: 'm', size: 14, c: C.sub });
      return F.svg(480, 280, s);
    } };

  /* ═══════════════ 자기개발능력 ═══════════════ */

  S.self3 = { cards: ['self|자기개발능력이란?'],
    cap: '자기개발의 세 요소 — 나를 알고(자아인식) · 관리하고(자기관리) · 길을 만든다(경력개발)',
    draw: function () {
      var st = [[24, 152, '자아인식', '흥미 · 적성 · 특성', C.blue, C.blueL, '조하리의 창'], [168, 106, '자기관리', '목표 세우고 실천', C.green, C.greenL, 'SMART 목표'],
        [312, 60, '경력개발', '경력 목표 · 준비', C.orange, C.orangeL, '']], s = '';
      for (var i = 0; i < 3; i++) {
        var p = st[i];
        s += box(p[0], p[1], 144, 236 - p[1], { fill: p[5], c: p[4], r: 4 }) + t(p[0] + 72, p[1] + 72, p[6], { a: 'm', size: 13, c: C.sub, halo: false }) + num(p[0] + 16, p[1] + 16, i + 1, { c: p[4] }) +
          t(p[0] + 76, p[1] + 26, p[2], { a: 'm', b: 1, size: 18, c: p[4], halo: false }) + t(p[0] + 72, p[1] + 50, p[3], { a: 'm', size: 13, halo: false });
      }
      s += person(420, 22, { s: 0.75, fill: C.orangeL, c: C.orange });
      s += t(24, 34, '스스로 · 평생 · 일과 관련해서', { size: 15, b: 1, c: C.sub });
      return F.svg(480, 250, s);
    } };

  S.johari = { cards: ['self|자아인식 — 조하리의 창'],
    cap: '조하리의 창 — 남의 피드백을 들으면 눈먼 창이, 나를 드러내면(자기공개) 숨겨진 창이 줄어 열린 창이 커진다',
    draw: function () {
      var x0 = 96, x1 = 290, x2 = 456, y0 = 50, y1 = 160, y2 = 242;
      var s = t((x0 + 250) / 2, 34, '내가 앎', { a: 'm', b: 1 }) + t((250 + x2) / 2, 34, '내가 모름', { a: 'm', b: 1 }) +
        t(50, 105, '남이\n앎', { a: 'm', b: 1 }) + t(50, 200, '남이\n모름', { a: 'm', b: 1 });
      s += box(x0, y0, x1 - x0, y1 - y0, { fill: C.blueL, c: C.blue, r: 0, w: 2 }) + box(x1, y0, x2 - x1, y1 - y0, { fill: '#fff', c: C.sub, r: 0 }) +
        box(x0, y1, x1 - x0, y2 - y1, { fill: '#fff', c: C.sub, r: 0 }) + box(x1, y1, x2 - x1, y2 - y1, { fill: C.grayL, c: C.sub, r: 0 });
      s += line(250, y0, 250, y2, { c: C.sub, w: 1.2, dash: '5 4' }) + line(x0, 130, x2, 130, { c: C.sub, w: 1.2, dash: '5 4' });
      s += t(170, 86, '열린 창', { a: 'm', b: 1, size: 18, c: C.blue, halo: false }) + t(170, 108, '공개된 나', { a: 'm', size: 13, halo: false });
      s += t(373, 86, '눈먼 창', { a: 'm', b: 1, size: 17, ans: 1 }) + t(373, 108, '나만 모르는 나', { a: 'm', size: 13, c: C.sub });
      s += t(193, 190, '숨겨진 창', { a: 'm', b: 1, size: 17 }) + t(193, 212, '비밀의 나', { a: 'm', size: 13, c: C.sub });
      s += t(373, 190, '미지의 창', { a: 'm', b: 1, size: 17 }) + t(373, 212, '아무도 모름', { a: 'm', size: 13, c: C.sub });
      s += arrow(254, 146, 286, 146, { c: C.green, w: 2, head: 9 }) + t(296, 146, '피드백', { size: 13, b: 1, c: C.green });
      s += arrow(116, 134, 116, 156, { c: C.green, w: 2, head: 9 }) + t(124, 145, '자기공개', { size: 13, b: 1, c: C.green });
      return F.svg(480, 256, s);
    } };

  S.smart = { cards: ['self|자기관리 — SMART 목표'],
    cap: 'SMART 목표 — “열심히” 대신 무엇을 · 얼마나 · 언제까지 할지 적는다',
    draw: function () {
      var s = t(240, 30, '열심히 공부 ✗', { a: 'm', size: 17, c: C.red }) + strike(180, 290, 30) + arrow(240, 46, 240, 72, { c: C.sub });
      var W = [['매일', 96], ['수학', 180], ['2시간', 272], ['한 달간', 378]];
      s += box(40, 82, 400, 50, { fill: C.blueL, c: C.blue, r: 10 });
      for (var i = 0; i < 4; i++) s += t(W[i][1], 107, W[i][0], { a: 'm', size: 22, b: 1, c: C.blue, halo: false });
      var L = [[96, 'A·R', '해낼 수 있는 양', C.green], [180, 'S', '구체적', C.orange], [272, 'M', '측정 가능', C.orange], [378, 'T', '기한', C.orange]];
      for (i = 0; i < 4; i++) {
        s += line(L[i][0], 134, L[i][0], 166, { c: L[i][3], w: 1.4 }) + circle(L[i][0], 184, 18, { fill: '#fff', c: L[i][3], w: 2, label: L[i][1], size: L[i][1].length > 1 ? 13 : 17, lc: L[i][3] }) +
          t(L[i][0], 222, L[i][2], { a: 'm', size: 14, b: 1 });
      }
      s += t(240, 252, 'Specific · Measurable · Achievable · Realistic · Time-bound', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 270, s);
    } };

  S.career = { cards: ['self|경력개발'],
    cap: '경력 단계 — 직업 선택 → 조직 입사 → 경력 초기 → 경력 중기 → 경력 말기, 평생 이어진다',
    draw: function () {
      var P = [[50, 222], [140, 190], [230, 150], [320, 110], [420, 80]];
      var s = path('M30,232 C90,220 110,200 140,190 S200,160 230,150 S290,118 320,110 S390,86 460,70', { c: C.blue, w: 3 });
      var L = [['직업 선택', ''], ['조직 입사', ''], ['경력 초기', '(적응)'], ['경력 중기', '(성취 · 정체 점검)'], ['경력 말기', '(마무리 · 후배 양성)']];
      for (var i = 0; i < 5; i++) {
        s += num(P[i][0], P[i][1], i + 1, { c: i === 4 ? C.orange : C.blue });
        if (i < 4) s += t(P[i][0], P[i][1] + 32, L[i][0], { a: 'm', size: 15, b: 1 }) + (L[i][1] ? t(P[i][0], P[i][1] + 52, L[i][1], { a: 'm', size: 13, c: C.sub }) : '');
      }
      s += t(464, 30, '경력 말기', { a: 'e', size: 15, b: 1 }) + t(464, 50, '(마무리 · 후배 양성)', { a: 'e', size: 13, c: C.sub });
      s += t(24, 34, '한 번에 끝나지 않고 평생', { size: 15, b: 1, c: C.blue });
      return F.svg(480, 262, s);
    } };

  /* ═══════════════ 자원관리능력 ═══════════════ */

  S.res4 = { cards: ['resource|자원관리능력이란?'],
    cap: '4대 자원(시간 · 예산 · 물적 · 인적)을 관리 4단계로 — 확인 → 수집 → 계획 → 수행',
    draw: function () {
      var X = [66, 184, 302, 420], s = '';
      s += circle(X[0], 62, 28, { fill: '#fff', c: C.blue, w: 2.2 }) + line(X[0], 62, X[0], 44, { c: C.blue, w: 2.4 }) + line(X[0], 62, X[0] + 14, 70, { c: C.blue, w: 2.4 });
      s += circle(X[1], 62, 28, { fill: C.yellowL, c: C.orange, w: 2.2, label: '₩', size: 24, lc: C.orange });
      s += poly([[X[2] - 26, 46], [X[2], 34], [X[2] + 26, 46], [X[2] + 26, 82], [X[2], 94], [X[2] - 26, 82]], { close: 1, fill: C.orangeL, c: C.ink, w: 1.8 }) +
        poly([[X[2] - 26, 46], [X[2], 58], [X[2] + 26, 46]], { c: C.ink, w: 1.6 }) + line(X[2], 58, X[2], 94, { c: C.ink, w: 1.6 });
      s += person(X[3] - 14, 44, { s: 0.8, fill: C.greenL, c: C.green }) + person(X[3] + 14, 50, { s: 0.8, fill: C.greenL, c: C.green });
      var N = ['시간', '예산(돈)', '물적자원', '인적자원'];
      for (var i = 0; i < 4; i++) s += t(X[i], 116, N[i], { a: 'm', b: 1, size: 16 });
      var St = ['필요 자원\n확인', '이용 가능\n자원 수집', '활용 계획\n수립', '계획대로\n수행'];
      for (i = 0; i < 4; i++) s += chevron(12 + i * 116, 146, 114, 56, { fill: i === 2 ? C.blueL : '#fff', c: C.blue }) +
        t(12 + i * 116 + 62, 174, St[i], { a: 'm', size: 14, b: 1, halo: false });
      s += t(240, 230, '가장 큰 낭비 = 계획 없이 되는 대로', { a: 'm', size: 14, b: 1, c: C.red });
      return F.svg(480, 248, s);
    } };

  S.matrix = { cards: ['resource|시간관리', 'self|자기관리 — SMART 목표'],
    cap: '시간관리 매트릭스 — 중요하지만 급하지 않은 ② 에 시간을 쓸수록 급한 불(①)이 줄어든다',
    draw: function () {
      var x0 = 110, y0 = 48, w = 170, h = 88;
      var s = t(x0 + w / 2, 32, '긴급함', { a: 'm', b: 1 }) + t(x0 + w * 1.5, 32, '긴급하지 않음', { a: 'm', b: 1 }) +
        t(58, y0 + h / 2, '중요함', { a: 'm', b: 1 }) + t(58, y0 + h * 1.5, '중요하지\n않음', { a: 'm', b: 1 });
      var CL = [['①', '즉시 처리', '마감 · 위기', C.red, C.redL], ['②', '계획하여 처리', '준비 · 예방 · 공부', C.green, C.greenL],
        ['③', '위임', '잡무 · 일부 연락', C.sub, '#fff'], ['④', '제거', '시간 낭비', C.sub, C.grayL]];
      for (var i = 0; i < 4; i++) {
        var x = x0 + (i % 2) * w, y = y0 + Math.floor(i / 2) * h, c = CL[i];
        s += box(x, y, w, h, { fill: c[4], c: c[3], r: 0, w: i === 1 ? 2.6 : 1.4 }) +
          t(x + w / 2, y + 32, c[0] + ' ' + c[1], { a: 'm', b: 1, size: 17, c: c[3] === C.sub ? C.ink : c[3], halo: false }) +
          t(x + w / 2, y + 58, c[2], { a: 'm', size: 14, halo: false });
      }
      s += t(280, 252, '② 에 투자 → ① 로 번질 일이 줄어든다', { a: 'm', size: 15, b: 1, c: C.green });
      return F.svg(480, 268, s);
    } };

  S.cost2 = { cards: ['resource|예산관리'],
    cap: '직접비는 제품·서비스에 바로 들어가고, 간접비는 회사 운영에 두루 쓰인다',
    draw: function () {
      var s = t(120, 26, '직접비', { a: 'm', b: 1, size: 18, c: C.blue }) + t(360, 26, '간접비', { a: 'm', b: 1, size: 18, c: C.orange }) + divider(240, 14, 250);
      var D = ['재료비', '인건비', '시설비', '출장 여비'], I = ['보험료', '광고비', '통신비', '건물관리비'];
      s += poly([[150, 110], [185, 96], [220, 110], [220, 170], [185, 184], [150, 170]], { close: 1, fill: C.blueL, c: C.blue, w: 2 }) +
        poly([[150, 110], [185, 124], [220, 110]], { c: C.blue, w: 1.6 }) + line(185, 124, 185, 184, { c: C.blue, w: 1.6 }) + t(185, 206, '제품', { a: 'm', b: 1 });
      for (var i = 0; i < 4; i++) {
        var y = 70 + i * 38;
        s += t(18, y, D[i], { size: 15 }) + arrow(92, y, 146, 118 + i * 14, { c: C.blue, w: 1.6, head: 9 });
      }
      s += poly([[326, 76], [386, 104], [266, 104]], { close: 1, fill: C.orangeL, c: C.orange, w: 1.8 }) + box(276, 104, 100, 90, { fill: '#fff', c: C.orange, r: 0, w: 1.8 });
      for (var r = 0; r < 2; r++) for (var q = 0; q < 3; q++) s += box(288 + q * 28, 118 + r * 30, 18, 18, { fill: C.orangeL, c: C.orange, r: 2, w: 1 });
      s += t(326, 206, '회사 운영', { a: 'm', b: 1 });
      for (i = 0; i < 4; i++) s += t(466, 88 + i * 34, I[i], { a: 'e', size: 14, c: C.orange });
      s += t(120, 236, '예) 제품을 만든 사람의 인건비', { a: 'm', size: 13, c: C.sub }) + t(360, 236, '예) 본사 광고비', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 254, s);
    } };

  S.wbs = { cards: ['resource|예산관리'],
    cap: '과업세부도(WBS) — 할 일을 잘게 나눠 맨 아래 칸마다 비용을 붙이면 빠지는 항목이 없다 (항목은 예)',
    draw: function () {
      var s = box(170, 16, 140, 42, { fill: C.blueL, c: C.blue, label: '공장 견학 행사', size: 16 });
      var Cx = [100, 240, 380], Cn = ['이동', '식사', '안전'];
      for (var i = 0; i < 3; i++) s += F.route([[240, 58], [240, 78], [Cx[i], 78], [Cx[i], 96]], { c: C.sub, w: 1.4, head: 8 }) +
        box(Cx[i] - 60, 98, 120, 38, { fill: '#fff', c: C.blue, label: Cn[i], size: 16 });
      var L = [[100, '버스 대여'], [240, '도시락'], [336, '보험 가입'], [424, '안전모']];
      for (i = 0; i < 4; i++) {
        var from = i < 2 ? Cx[i] : 380;
        s += F.route([[from, 136], [from, 152], [L[i][0], 152], [L[i][0], 170]], { c: C.sub, w: 1.2, head: 7 }) +
          box(L[i][0] - 42, 172, 84, 34, { fill: C.orangeL, c: C.orange, label: L[i][1], size: 14 }) + t(L[i][0], 222, '₩', { a: 'm', size: 15, b: 1, c: C.orange });
      }
      s += t(240, 248, '맨 아래 칸마다 비용 → 모두 더하면 예산', { a: 'm', size: 14, b: 1 });
      return F.svg(480, 266, s);
    } };

  S.shelf = { cards: ['resource|물적 · 인적 자원관리'],
    cap: '물품 보관 — 같은 것·비슷한 것끼리 모으고, 자주 쓰는 것은 문 가까이 둔다(회전 대응)',
    draw: function () {
      var s = path('M40,110 V28 H460 V214 H40 V152', { c: C.ink, w: 2.4 }) + path('M40,110 A42,42 0 0 1 82,152', { c: C.sub, w: 1.2, dash: '4 3' }) +
        line(40, 110, 82, 110, { c: C.sub, w: 1.6 }) + t(22, 131, '문', { a: 'm', size: 14, b: 1 });
      var Y = [56, 116, 176];
      for (var i = 0; i < 3; i++) s += box(100, Y[i], 340, 30, { fill: C.grayL, c: C.sub, r: 3, w: 1.2 });
      for (i = 0; i < 5; i++) s += circle(122 + i * 26, 71, 10, { fill: C.blueL, c: C.blue, w: 1.6 });
      var R = [6, 8, 10, 12];
      for (i = 0; i < 4; i++) s += circle(246 + i * 30, 131, R[i], { fill: C.greenL, c: C.green, w: 1.6 });
      for (i = 0; i < 3; i++) s += box(356 + i * 26, 181, 20, 20, { fill: '#fff', c: C.sub, r: 2, w: 1.4 });
      s += t(104, 46, '같은 것끼리 (동일성) · 자주 씀', { size: 13, b: 1, c: C.blue });
      s += t(236, 106, '비슷한 것끼리 (유사성)', { size: 13, b: 1, c: C.green });
      s += t(436, 166, '가끔 씀', { a: 'e', size: 13, c: C.sub });
      s += arrow(440, 238, 60, 238, { c: C.orange, w: 2 }) + t(250, 226, '자주 쓸수록 문 가까이', { a: 'm', size: 14, b: 1, c: C.orange });
      return F.svg(480, 256, s);
    } };

  S.fit3 = { cards: ['resource|물적 · 인적 자원관리'],
    cap: '인적자원 배치 3원칙 — 적재적소(자리에 맞는 사람) · 능력주의 · 균형주의(전체 균형)',
    draw: function () {
      var s = divider(160, 20, 220) + divider(320, 20, 220);
      s += t(80, 28, '적재적소', { a: 'm', b: 1, size: 17, c: C.blue });
      s += box(20, 150, 120, 50, { fill: C.grayL, c: C.sub, r: 4 }) + circle(48, 175, 13, { fill: '#fff', c: C.sub, dash: '4 3' }) +
        poly([[80, 162], [93, 188], [67, 188]], { close: 1, fill: '#fff', c: C.sub }) + box(102, 163, 24, 24, { fill: '#fff', c: C.sub, r: 1 });
      s += circle(48, 80, 13, { fill: C.blueL, c: C.blue }) + poly([[80, 67], [93, 93], [67, 93]], { close: 1, fill: C.blueL, c: C.blue }) +
        box(102, 68, 24, 24, { fill: C.blueL, c: C.blue, r: 1 });
      s += arrow(48, 98, 48, 156, { c: C.blue, w: 1.4, head: 8 }) + arrow(80, 98, 80, 156, { c: C.blue, w: 1.4, head: 8 }) + arrow(114, 98, 114, 156, { c: C.blue, w: 1.4, head: 8 });
      s += t(80, 222, '자리에 맞는 사람', { a: 'm', size: 13 });
      s += t(240, 28, '능력주의', { a: 'm', b: 1, size: 17, c: C.green });
      for (var i = 0; i < 3; i++) s += box(186 + i * 36, 170 - i * 34, 36, 30 + i * 34, { fill: C.greenL, c: C.green, r: 2 });
      s += person(276, 70, { s: 0.7, fill: C.greenL, c: C.green }) + arrow(186, 150, 252, 82, { c: C.green, w: 1.6, head: 9 });
      s += t(240, 222, '능력만큼 맡기고 평가', { a: 'm', size: 13 });
      s += t(400, 28, '균형주의', { a: 'm', b: 1, size: 17, c: C.orange });
      s += poly([[400, 150], [388, 176], [412, 176]], { close: 1, fill: C.orangeL, c: C.orange }) + line(340, 150, 460, 150, { c: C.ink, w: 3 });
      s += person(356, 110, { s: 0.7 }) + person(444, 110, { s: 0.7 });
      s += t(400, 222, '팀 전체의 균형', { a: 'm', size: 13 });
      return F.svg(480, 240, s);
    } };

  /* ═══════════════ 대인관계능력 ═══════════════ */

  S.bank = { cards: ['relation|대인관계능력이란?'],
    cap: '감정은행계좌 — 사소한 배려와 약속 이행이 신뢰를 예금처럼 쌓는다',
    draw: function () {
      var s = t(24, 32, '감정은행계좌', { size: 17, b: 1, c: C.blue }), L = ['배려', '약속 이행', '배려', '약속 이행'];
      for (var i = 0; i < 4; i++) {
        var cx = 84 + i * 96, nn = (i + 1) * 2;
        for (var k = 0; k < nn; k++) s += ell(cx, 204 - k * 11, 26, 8, { fill: k >= nn - 2 ? C.yellowL : '#fff', c: C.orange, w: 1.4, op: 1 });
        s += t(cx, 232, '+ ' + L[i], { a: 'm', size: 14, b: 1 });
      }
      s += line(40, 216, 420, 216, { c: C.ink, w: 1.4 });
      s += path('M84,170 L180,148 L276,126 L372,104', { c: C.green, w: 2, dash: '6 4' }) + arrow(372, 104, 436, 88, { c: C.green, w: 2 });
      s += t(452, 68, '신뢰', { a: 'm', b: 1, size: 18, c: C.green });
      s += t(240, 260, '출발점은 화려한 말솜씨가 아니라 진정성', { a: 'm', size: 14, c: C.sub });
      return F.svg(480, 278, s);
    } };

  S.member5 = { cards: ['relation|팀워크와 리더십'],
    cap: '멤버십 5유형 — 스스로 생각하고 적극 참여하는 주도형이 가장 이상적 (두 축은 널리 쓰는 분류 기준)',
    draw: function () {
      var s = arrow(90, 216, 462, 216, { c: C.ink, w: 1.6 }) + arrow(90, 216, 90, 26, { c: C.ink, w: 1.6 });
      s += t(276, 240, '적극적으로 참여하는가 →', { a: 'm', size: 14, c: C.sub });
      s += '<g transform="rotate(-90 30 121)">' + t(30, 121, '스스로 생각하는가 →', { a: 'm', size: 14, c: C.sub }) + '</g>';
      s += t(72, 60, '독립', { a: 'e', size: 13, c: C.sub }) + t(72, 186, '의존', { a: 'e', size: 13, c: C.sub });
      var P = [[108, 42, '소외형', '#fff', C.sub], [330, 42, '주도형', C.greenL, C.green], [219, 103, '실무형', '#fff', C.sub],
        [108, 164, '수동형', '#fff', C.sub], [330, 164, '순응형', '#fff', C.sub]];
      for (var i = 0; i < 5; i++) s += box(P[i][0], P[i][1], 110, 40, { fill: P[i][3], c: P[i][4], w: i === 1 ? 2.4 : 1.4, label: P[i][2], size: 17, lc: i === 1 ? C.green : C.ink });
      s += t(385, 96, '가장 이상적', { a: 'm', size: 13, b: 1, c: C.green });
      return F.svg(480, 256, s);
    } };

  S.tk5 = { cards: ['relation|갈등관리'],
    cap: '갈등 해결 5가지 방식 — 내 이익 × 상대 이익, 둘 다 챙기는 방식이 가장 바람직하다',
    draw: function () {
      var s = arrow(90, 220, 462, 220, { c: C.ink, w: 1.6 }) + arrow(90, 220, 90, 22, { c: C.ink, w: 1.6 });
      s += t(276, 244, '상대 이익을 챙긴다 →', { a: 'm', size: 14, c: C.sub });
      s += '<g transform="rotate(-90 30 121)">' + t(30, 121, '내 이익을 챙긴다 →', { a: 'm', size: 14, c: C.sub }) + '</g>';
      var P = [[108, 34, '경쟁', '내가 이김', C.redL, C.red], [330, 34, '협력 (통합)', 'win-win', C.greenL, C.green], [219, 100, '타협', '서로 절반', C.orangeL, C.orange],
        [108, 166, '회피', '일단 피함', C.grayL, C.sub], [330, 166, '수용 (양보)', '내가 양보', C.blueL, C.blue]];
      for (var i = 0; i < 5; i++) {
        var p = P[i];
        s += box(p[0], p[1], 118, 46, { fill: p[4], c: p[5], w: i === 1 ? 2.4 : 1.4 }) +
          t(p[0] + 59, p[1] + 16, p[2], { a: 'm', b: 1, size: 16, c: p[5] === C.sub ? C.ink : p[5], halo: false, ans: i === 1 }) +
          t(p[0] + 59, p[1] + 35, p[3], { a: 'm', size: 13, halo: false });
      }
      return F.svg(480, 260, s);
    } };

  S.complain6 = { cards: ['relation|협상과 고객서비스'],
    cap: '불만 고객 응대 6단계 — 반박이 아니라 끝까지 듣고 공감하는 것이 먼저',
    draw: function () {
      var L = ['경청', '감사·공감', '사과', '해결 약속', '신속 처리', '처리 확인'], s = '';
      for (var i = 0; i < 6; i++) {
        var x = 12 + i * 77, y = 184 - i * 26, first = i === 0;
        s += box(x, y, 73, 244 - y, { fill: first ? C.orangeL : C.blueL, c: first ? C.orange : C.blue, r: 3 }) + num(x + 36, y + 18, i + 1, { c: first ? C.orange : C.blue }) +
          t(x + 36.5, y + 44, L[i], { a: 'm', size: L[i].length > 4 ? 13 : 14, b: 1, halo: false });
      }
      s += t(20, 34, '✗ “그건 규정입니다”', { size: 15, b: 1, c: C.red }) + t(20, 58, '반박부터 하면 갈등이 커진다', { size: 13, c: C.sub });
      s += callout(48, 184, 60, 150, '먼저!', { c: C.orange, tc: C.orange, b: 1 });
      return F.svg(480, 258, s);
    } };

  /* ═══════════════ 정보능력 ═══════════════ */

  S.dikw = { cards: ['info|정보능력이란?'],
    cap: '자료 → 정보 → 지식 — 같은 숫자도 목적에 맞게 가공하면 정보, 구조화·일반화하면 지식',
    draw: function () {
      var s = poly([[140, 30], [182, 100], [98, 100]], { close: 1, fill: C.greenL, c: C.green, w: 1.8 }) +
        poly([[98, 100], [182, 100], [221, 165], [59, 165]], { close: 1, fill: C.blueL, c: C.blue, w: 1.8 }) +
        poly([[59, 165], [221, 165], [260, 230], [20, 230]], { close: 1, fill: C.grayL, c: C.sub, w: 1.8 });
      s += t(140, 78, '지식', { a: 'm', b: 1, size: 17, c: C.green, halo: false }) + t(140, 134, '정보', { a: 'm', b: 1, size: 18, c: C.blue, halo: false }) +
        t(140, 199, '자료', { a: 'm', b: 1, size: 18, halo: false });
      s += line(176, 70, 284, 70, { c: C.green, w: 1.2, dash: '4 3' }) + line(206, 134, 284, 134, { c: C.blue, w: 1.2, dash: '4 3' }) + line(244, 199, 284, 199, { c: C.sub, w: 1.2, dash: '4 3' });
      s += t(290, 60, '“학년이 오를수록', { size: 14 }) + t(290, 80, '키가 큰다”', { size: 14 }) + t(290, 100, '구조화 · 일반화', { size: 13, c: C.green, b: 1 });
      s += t(290, 126, '우리 반 평균 키', { size: 14 }) + t(290, 146, '목적에 맞게 가공', { size: 13, c: C.blue, b: 1 });
      s += t(290, 191, '학생들의 키 측정값', { size: 14 }) + t(290, 211, '가공 전의 날것', { size: 13, c: C.sub, b: 1 });
      return F.svg(480, 250, s);
    } };

  S.vlookup = { cards: ['info|컴퓨터 활용 — 엑셀·DB'],
    cap: 'VLOOKUP — 찾을 값(사번)을 표의 첫 열에서 찾아, 같은 행의 지정한 열(이름)을 가져온다 (표 내용은 예)',
    draw: function () {
      var H = ['사번', '이름', '부서'], R = [['1001', '김민수', '생산'], ['1002', '이지은', '품질'], ['1003', '박준호', '설비'], ['1004', '최유리', '총무']];
      var X = [50, 140, 250], W = [90, 110, 90], s = t(20, 26, '=VLOOKUP(1003, A:C, 2, FALSE)', { size: 15, b: 1, c: C.blue });
      for (var c = 0; c < 3; c++) {
        s += t(X[c] + W[c] / 2, 50, 'ABC'[c], { a: 'm', size: 13, c: C.sub }) + box(X[c], 60, W[c], 30, { fill: C.grayL, c: C.sub, r: 0, w: 1.2, label: H[c], size: 15 });
        for (var r = 0; r < 4; r++) {
          var hit = r === 2, got = hit && c === 1;
          s += box(X[c], 90 + r * 30, W[c], 30, { fill: got ? C.greenL : (hit ? C.orangeL : '#fff'), c: C.sub, r: 0, w: 1.2, label: R[r][c], size: 15, b: got || (hit && c === 0) ? 1 : 0 });
        }
      }
      s += arrow(32, 96, 32, 162, { c: C.orange, w: 2 }) + num(32, 78, 1, { c: C.orange }) + arrow(124, 172, 150, 172, { c: C.green, w: 2, head: 9 });
      s += arrow(340, 165, 372, 165, { c: C.green, w: 2 }) + box(376, 138, 92, 54, { fill: C.greenL, c: C.green }) + t(422, 154, '결과', { a: 'm', size: 13, c: C.sub, halo: false }) +
        t(422, 176, '박준호', { a: 'm', b: 1, size: 17, c: C.green, halo: false });
      s += t(50, 252, '① 첫 열에서 1003 을 찾는다', { size: 14, b: 1, c: C.orange }) + t(50, 274, '② 같은 행의 2번째 열을 가져온다', { size: 14, b: 1, c: C.green });
      return F.svg(480, 292, s);
    } };

  S.iffunc = { cards: ['info|컴퓨터 활용 — 엑셀·DB'],
    cap: 'IF 는 조건에 따라 두 값 중 하나를, COUNTIF 는 조건에 맞는 칸의 개수를 돌려준다 (점수는 예)',
    draw: function () {
      var s = divider(244, 14, 250) + t(122, 26, '=IF(A1>=60,"합격","불합격")', { a: 'm', size: 14, b: 1, c: C.blue });
      s += poly([[122, 50], [206, 90], [122, 130], [38, 90]], { close: 1, fill: C.orangeL, c: C.orange, w: 1.8 }) + t(122, 90, 'A1 ≥ 60 ?', { a: 'm', b: 1, size: 16, halo: false });
      s += F.route([[80, 110], [68, 150], [68, 176]], { c: C.green, w: 1.8, head: 9 }) + F.route([[164, 110], [176, 150], [176, 176]], { c: C.red, w: 1.8, head: 9 });
      s += t(56, 142, '참', { a: 'e', size: 14, b: 1, c: C.green }) + t(188, 142, '거짓', { size: 14, b: 1, c: C.red });
      s += box(22, 180, 92, 42, { fill: C.greenL, c: C.green, label: '합격', lc: C.green }) + box(130, 180, 92, 42, { fill: C.redL, c: C.red, label: '불합격', lc: C.red });
      s += t(362, 26, '=COUNTIF(B1:B5,">=80")', { a: 'm', size: 14, b: 1, c: C.blue });
      var V = [85, 72, 91, 64, 88];
      for (var i = 0; i < 5; i++) {
        var ok = V[i] >= 80;
        s += box(292, 48 + i * 34, 70, 30, { fill: ok ? C.greenL : '#fff', c: ok ? C.green : C.sub, r: 2, label: String(V[i]), size: 16, b: ok ? 1 : 0 }) +
          (ok ? t(376, 63 + i * 34, '✔', { size: 16, b: 1, c: C.green }) : '');
      }
      s += t(432, 122, '3', { a: 'm', b: 1, size: 30, c: C.green }) + t(432, 150, '개', { a: 'm', size: 14, c: C.green });
      s += t(362, 238, '80 이상인 칸만 센다', { a: 'm', size: 14 });
      return F.svg(480, 256, s);
    } };

  S.privacy = { cards: ['info|정보보안 · 개인정보'],
    cap: '개인정보는 필요한 만큼만 모으고 → 동의받은 목적에만 쓰고 → 안전하게 보관하고 → 다 쓰면 파기한다',
    draw: function () {
      var X = [66, 182, 298, 414], N = ['최소 수집', '목적 안에서만', '안전하게 보관', '다 쓰면 파기'], Sb = ['필요한 만큼만', '목적 외 사용 금지', '유출을 막는다', '남기지 않는다'], s = '';
      s += poly([[38, 38], [94, 38], [74, 68], [74, 96], [58, 96], [58, 68]], { close: 1, fill: C.blueL, c: C.blue, w: 1.8 });
      s += circle(X[1], 66, 30, { fill: '#fff', c: C.green, w: 1.8 }) + circle(X[1], 66, 18, { fill: C.greenL, c: C.green }) + circle(X[1], 66, 6, { fill: C.green, c: C.green });
      s += path('M' + (X[2] - 14) + ',60 V48 A14,14 0 0 1 ' + (X[2] + 14) + ',48 V60', { c: C.ink, w: 3 }) + box(X[2] - 24, 60, 48, 38, { fill: C.orangeL, c: C.orange, r: 5, w: 1.8 }) +
        circle(X[2], 78, 5, { fill: C.orange, c: C.orange });
      s += box(X[3] - 28, 40, 56, 26, { fill: C.grayL, c: C.ink, r: 4, w: 1.8 });
      for (var k = 0; k < 6; k++) s += line(X[3] - 22 + k * 9, 70, X[3] - 22 + k * 9, 98 - (k % 2) * 8, { c: C.sub, w: 3 });
      for (var i = 0; i < 4; i++) {
        s += t(X[i], 130, N[i], { a: 'm', b: 1, size: 15 }) + t(X[i], 152, Sb[i], { a: 'm', size: 13, c: C.sub });
        if (i < 3) s += arrow(X[i] + 44, 66, X[i] + 74, 66, { c: C.sub, w: 1.8, head: 9 });
      }
      s += line(20, 176, 460, 176, { c: C.grayM, w: 1.2, dash: '5 4' });
      s += t(240, 200, '보안 습관 — 복잡한 비밀번호 · 백신 켜기', { a: 'm', size: 14 }) + t(240, 222, '출처 모르는 첨부파일·링크는 열지 않는다', { a: 'm', size: 14, b: 1, c: C.red });
      return F.svg(480, 240, s);
    } };

  /* ═══════════════ 기술능력 ═══════════════ */

  S.knowhow = { cards: ['tech|기술능력이란?'],
    cap: '노하우(경험으로 익힌 방법)와 노와이(원리를 아는 지식) — 둘이 결합될 때 기술이 강해진다',
    draw: function () {
      var s = ell(168, 122, 104, 96, { fill: C.blueL, c: C.blue, w: 1.8, op: 0.7 }) + ell(312, 122, 104, 96, { fill: C.orangeL, c: C.orange, w: 1.8, op: 0.7 });
      s += t(126, 86, '노하우', { a: 'm', b: 1, size: 19, c: C.blue, halo: false }) + t(126, 110, 'know-how', { a: 'm', size: 13, c: C.sub, halo: false }) +
        t(126, 140, '경험적 · 절차적', { a: 'm', size: 14, halo: false }) + t(126, 162, '경험 · 반복으로', { a: 'm', size: 14, b: 1, halo: false });
      s += t(354, 86, '노와이', { a: 'm', b: 1, size: 19, c: C.orange, halo: false }) + t(354, 110, 'know-why', { a: 'm', size: 13, c: C.sub, halo: false }) +
        t(354, 140, '원리 · 이론', { a: 'm', size: 14, halo: false }) + t(354, 162, '이론 · 교육으로', { a: 'm', size: 14, b: 1, halo: false });
      s += t(240, 114, '결합', { a: 'm', b: 1, size: 16, c: C.green, halo: false }) + t(240, 136, '강한 기술', { a: 'm', size: 13, b: 1, c: C.green, halo: false });
      return F.svg(480, 244, s);
    } };

  S.bench4 = { cards: ['tech|기술선택 — 벤치마킹·매뉴얼'],
    cap: '벤치마킹의 네 유형 — 배우는 대상이 우리에게서 얼마나 먼가 (베끼기가 아니라 우리에 맞게 고쳐 적용)',
    draw: function () {
      var cy = 252, R = [232, 186, 140, 94, 48], Fl = ['#fff', C.grayL, '#fff', C.blueL, C.blue], s = '';
      for (var i = 0; i < 5; i++) s += path('M' + (240 - R[i]) + ',' + cy + ' A' + R[i] + ',' + R[i] + ' 0 0 1 ' + (240 + R[i]) + ',' + cy + ' Z', { fill: Fl[i], c: C.blue, w: 1.6 });
      var L = [['글로벌', '해외 선진 기업'], ['비경쟁적', '다른 업종의 우수 기업'], ['경쟁적', '경쟁사'], ['내부', '같은 조직 다른 부서']];
      for (i = 0; i < 4; i++) {
        var y = cy - (R[i] + R[i + 1]) / 2;
        s += t(240, y - 6, L[i][0], { a: 'm', b: 1, size: 15, halo: false }) + t(240, y + 12, L[i][1], { a: 'm', size: 13, c: C.sub, halo: false });
      }
      s += t(240, cy - 18, '우리', { a: 'm', b: 1, size: 15, c: '#fff', halo: false });
      return F.svg(480, 266, s);
    } };

  S.topdown = { cards: ['tech|기술선택 — 벤치마킹·매뉴얼'],
    cap: '기술선택 방식 — 상향식은 엔지니어가 아래에서, 하향식은 경영진이 큰 방향을 먼저 정한다',
    draw: function () {
      function tri(cx, up) {
        var c = up ? C.blue : C.orange, o = poly([[cx, 50], [cx + 34, 110], [cx - 34, 110]], { close: 1, fill: up ? '#fff' : C.orangeL, c: c, w: 1.8 }) +
          poly([[cx - 34, 110], [cx + 34, 110], [cx + 74, 180], [cx - 74, 180]], { close: 1, fill: up ? C.blueL : '#fff', c: c, w: 1.8 });
        o += t(cx, 92, '경영진', { a: 'm', size: 13, b: 1, halo: false }) + t(cx, 148, '엔지니어', { a: 'm', size: 15, b: 1, halo: false });
        o += up ? arrow(cx + 92, 176, cx + 92, 56, { c: c, w: 2.4 }) : arrow(cx + 92, 56, cx + 92, 176, { c: c, w: 2.4 });
        return o;
      }
      var s = tri(110, 1) + tri(340, 0) + divider(240, 16, 220);
      s += t(120, 28, '상향식', { a: 'm', b: 1, size: 17, c: C.blue }) + t(350, 28, '하향식', { a: 'm', b: 1, size: 17, c: C.orange });
      s += t(120, 206, '엔지니어 중심으로 제안', { a: 'm', size: 13 }) + t(350, 206, '경영진이 큰 방향 결정', { a: 'm', size: 13 });
      return F.svg(480, 226, s);
    } };

  S.ipr4 = { cards: ['tech|산업재산권'],
    cap: '산업재산권 네 가지 — 특허(수준 높은 발명) · 실용신안(작은 개량) · 디자인(모양) · 상표(이름·로고)',
    draw: function () {
      var X = [62, 180, 300, 418], N = ['특허권', '실용신안권', '디자인권', '상표권'], A = ['수준 높은 발명', '작은 고안 · 개량', '물품의 모양', '이름 · 로고'],
        E = ['새 배터리 기술', '잡기 쉬운 손잡이', '음료병 디자인', '브랜드 마크'], s = '';
      s += box(X[0] - 22, 46, 44, 66, { fill: C.blueL, c: C.blue, r: 6, w: 1.8 }) + box(X[0] - 9, 38, 18, 8, { fill: C.blue, c: C.blue, r: 2 }) +
        poly([[X[0] + 4, 56], [X[0] - 9, 82], [X[0], 82], [X[0] - 5, 102], [X[0] + 10, 74], [X[0] + 1, 74]], { close: 1, fill: C.orange, c: C.orange, w: 1 });
      s += box(X[1] - 26, 50, 40, 60, { fill: '#fff', c: C.ink, r: 4, w: 1.8 }) + path('M' + (X[1] + 14) + ',60 Q' + (X[1] + 40) + ',62 ' + (X[1] + 38) + ',80 Q' + (X[1] + 36) + ',98 ' + (X[1] + 14) + ',98', { c: C.green, w: 6 });
      s += path('M' + (X[2] - 7) + ',38 H' + (X[2] + 7) + ' V54 Q' + (X[2] + 22) + ',66 ' + (X[2] + 16) + ',84 Q' + (X[2] + 12) + ',94 ' + (X[2] + 18) + ',112 H' + (X[2] - 18) +
        ' Q' + (X[2] - 12) + ',94 ' + (X[2] - 16) + ',84 Q' + (X[2] - 22) + ',66 ' + (X[2] - 7) + ',54 Z', { fill: C.blueL, c: C.blue, w: 1.8 });
      s += circle(X[3], 78, 32, { fill: C.orangeL, c: C.orange, w: 2.4 }) + t(X[3], 79, '★', { a: 'm', size: 30, c: C.orange, halo: false });
      for (var i = 0; i < 4; i++) s += t(X[i], 140, N[i], { a: 'm', b: 1, size: 16 }) + t(X[i], 162, A[i], { a: 'm', size: 13 }) + t(X[i], 182, E[i], { a: 'm', size: 13, c: C.sub });
      s += line(20, 200, 460, 200, { c: C.grayM, w: 1.2, dash: '5 4' });
      s += t(240, 222, '특허청에 등록해야 보호 · 특허권은 보통 출원일부터 20년', { a: 'm', size: 14, b: 1 });
      return F.svg(480, 240, s);
    } };

  /* ═══════════════ 조직이해능력 ═══════════════ */

  S.porter = { cards: ['org|경영이해 — 전략'],
    cap: '포터의 본원적 경쟁전략 — 싸게 · 다르게 · 좁게',
    draw: function () {
      var s = t(205, 32, '남보다 싸게', { a: 'm', b: 1 }) + t(375, 32, '남과 다르게', { a: 'm', b: 1 }) +
        t(62, 90, '넓은\n시장', { a: 'm', b: 1 }) + t(62, 178, '좁은\n시장', { a: 'm', b: 1 });
      s += box(120, 48, 170, 84, { fill: C.blueL, c: C.blue, r: 4 }) + t(205, 78, '원가우위', { a: 'm', b: 1, size: 19, c: C.blue, halo: false, ans: 1 }) +
        t(205, 106, '대량생산 저가 마트', { a: 'm', size: 13, halo: false });
      s += box(290, 48, 170, 84, { fill: C.orangeL, c: C.orange, r: 4 }) + t(375, 78, '차별화', { a: 'm', b: 1, size: 19, c: C.orange, halo: false, ans: 1 }) +
        t(375, 106, '프리미엄 브랜드', { a: 'm', size: 13, halo: false });
      s += box(120, 136, 340, 84, { fill: C.greenL, c: C.green, r: 4 }) + t(290, 166, '집중화', { a: 'm', b: 1, size: 19, c: C.green, halo: false, ans: 1 }) +
        t(290, 194, '특정 시장 · 고객에 집중 — 유아 전용 제품', { a: 'm', size: 13, halo: false });
      return F.svg(480, 238, s);
    } };

  S.orgchart = { cards: ['org|조직체제 · 부서 업무'],
    cap: '조직도 — 지휘·보고 관계와 부서별 대표 업무 (조직도 모양은 예)',
    draw: function () {
      var D = [['기획', '경영 계획\n전략 수립'], ['총무', '행사 · 비품\n시설'], ['인사', '채용 · 교육\n평가'], ['회계', '자금 · 결산\n세무'], ['영업', '판매\n고객 관리']];
      var s = box(190, 16, 100, 40, { fill: C.grayL, c: C.ink, label: '사장', size: 17 }) + line(240, 56, 240, 78, { c: C.ink, w: 1.6 }) + line(54, 78, 426, 78, { c: C.ink, w: 1.6 });
      for (var i = 0; i < 5; i++) {
        var x = 12 + i * 93, hi = i === 2;
        s += line(x + 42, 78, x + 42, 96, { c: C.ink, w: 1.6 }) + box(x, 96, 84, 40, { fill: hi ? C.blueL : '#fff', c: hi ? C.blue : C.sub, w: hi ? 2.2 : 1.4, label: D[i][0], size: 17, lc: hi ? C.blue : C.ink }) +
          t(x + 42, 166, D[i][1], { a: 'm', size: 13 });
      }
      s += t(24, 36, '보고 ↑ · 지시 ↓', { size: 13, c: C.sub });
      s += t(240, 212, '“신입사원 채용 공고” → 인사', { a: 'm', size: 14, b: 1, c: C.blue });
      return F.svg(480, 230, s);
    } };

  S.s7 = { cards: ['org|조직체제 · 부서 업무'],
    cap: '조직문화 7S — 가운데 공유가치를 나머지 여섯 요소가 둘러싼다',
    draw: function () {
      var P = [[240, 46, '전략'], [384, 92, '구조'], [384, 184, '제도'], [240, 230, '구성원'], [96, 184, '기술'], [96, 92, '리더십']], s = '';
      for (var i = 0; i < 6; i++) {
        var q = P[(i + 1) % 6];
        s += line(P[i][0], P[i][1], q[0], q[1], { c: C.grayM, w: 1.4 }) + line(P[i][0], P[i][1], 240, 138, { c: C.grayM, w: 1.4 });
      }
      for (i = 0; i < 6; i++) s += circle(P[i][0], P[i][1], 33, { fill: C.blueL, c: C.blue, label: P[i][2], size: 15 });
      s += circle(240, 138, 42, { fill: C.orangeL, c: C.orange, w: 2.4, label: '공유가치', size: 16, lc: C.orange });
      return F.svg(480, 276, s);
    } };

  S.gyeoljae = { cards: ['org|업무이해 · 국제감각'],
    cap: '결재 — 전결은 위임받은 사람이 대신 결재, 대결은 결재권자가 없을 때 대신 결재 (결재란 모양은 예)',
    draw: function () {
      var X = [170, 246, 322, 398], H = ['담당', '과장', '부장', '사장'], s = '';
      for (var c = 0; c < 4; c++) s += t(X[c] + 35, 28, H[c], { a: 'm', size: 14, b: 1 });
      function stamp(cx, cy, c) { return circle(cx, cy, 15, { fill: '#fff', c: c || C.red, w: 2.2, label: '인', size: 14, lc: c || C.red }); }
      var R = [['보통 결재', '결재권자가 직접'], ['전결', '위임받아 대신 결재'], ['대결', '결재권자 부재 시 대신']];
      for (var r = 0; r < 3; r++) {
        var y = 42 + r * 70;
        s += t(16, y + 18, R[r][0], { size: 16, b: 1, c: r === 0 ? C.ink : (r === 1 ? C.orange : C.blue) }) + t(16, y + 40, R[r][1], { size: 13, c: C.sub });
        for (c = 0; c < 4; c++) s += box(X[c], y, 70, 54, { fill: '#fff', c: C.sub, r: 0, w: 1.2 });
        s += stamp(X[0] + 35, y + 27) + stamp(X[1] + 35, y + 27);
        if (r === 0) s += stamp(X[2] + 35, y + 27) + stamp(X[3] + 35, y + 27);
        if (r === 1) s += stamp(X[2] + 22, y + 27, C.orange) + t(X[2] + 54, y + 27, '전결', { a: 'm', size: 13, b: 1, c: C.orange }) + t(X[3] + 35, y + 27, '(위임함)', { a: 'm', size: 13, c: C.sub });
        if (r === 2) s += stamp(X[2] + 22, y + 27, C.blue) + t(X[2] + 54, y + 27, '대결', { a: 'm', size: 13, b: 1, c: C.blue }) + t(X[3] + 35, y + 27, '부재', { a: 'm', size: 14, b: 1, c: C.red });
      }
      return F.svg(480, 262, s);
    } };

  /* ═══════════════ 직업윤리 ═══════════════ */

  S.ethic2 = { cards: ['ethic|직업윤리란?'],
    cap: '직업윤리 두 갈래 — 일 자체를 대하는 근로윤리, 남·사회와의 관계인 공동체윤리',
    draw: function () {
      var s = person(240, 60, { s: 1.2 }) + t(240, 124, '나', { a: 'm', b: 1, size: 17 });
      var g = '', n = 8;
      for (var i = 0; i < n; i++) { var a = i * Math.PI * 2 / n; g += line(80 + 22 * Math.cos(a), 80 + 22 * Math.sin(a), 80 + 32 * Math.cos(a), 80 + 32 * Math.sin(a), { c: C.blue, w: 9 }); }
      s += g + circle(80, 80, 24, { fill: C.blueL, c: C.blue, w: 2, label: '일', size: 17, lc: C.blue });
      s += person(382, 58, { s: 0.85, fill: C.greenL, c: C.green }) + person(418, 66, { s: 0.85, fill: C.greenL, c: C.green }) + person(400, 44, { s: 0.85, fill: C.greenL, c: C.green });
      s += t(400, 124, '남 · 사회', { a: 'm', b: 1, size: 15, c: C.green });
      s += arrow(206, 80, 122, 80, { c: C.blue, w: 2.2 }) + arrow(274, 80, 356, 80, { c: C.green, w: 2.2 });
      s += box(16, 148, 210, 70, { fill: C.blueL, c: C.blue }) + t(121, 172, '근로윤리', { a: 'm', b: 1, size: 18, c: C.blue, halo: false }) +
        t(121, 198, '근면 · 정직 · 성실', { a: 'm', size: 15, halo: false });
      s += box(254, 148, 210, 70, { fill: C.greenL, c: C.green }) + t(359, 172, '공동체윤리', { a: 'm', b: 1, size: 18, c: C.green, halo: false }) +
        t(359, 198, '봉사 · 책임 · 준법 · 예절', { a: 'm', size: 15, halo: false });
      return F.svg(480, 234, s);
    } };

  S.trust = { cards: ['ethic|근로윤리 — 근면·정직·성실'],
    cap: '신뢰는 천천히 쌓이고 한 번의 거짓말에 무너진다 — 실수는 숨기지 말고 솔직히 알린다 (그래프는 개념)',
    draw: function () {
      var s = arrow(50, 214, 462, 214, { c: C.ink, w: 1.6 }) + arrow(50, 214, 50, 24, { c: C.ink, w: 1.6 }) + t(40, 20, '신뢰', { size: 14, b: 1 }) + t(462, 232, '시간', { a: 'e', size: 14, c: C.sub });
      s += poly([[58, 204], [100, 190], [140, 176], [180, 160], [220, 144], [262, 130]], { c: C.blue, w: 3 });
      s += poly([[262, 130], [310, 118], [370, 102], [440, 84]], { c: C.green, w: 3, dash: '7 5' });
      s += poly([[262, 130], [276, 196], [340, 192], [440, 184]], { c: C.red, w: 3 });
      s += circle(262, 130, 6, { fill: C.orange, c: C.orange }) + t(250, 108, '실수가 생김', { a: 'e', size: 14, b: 1, c: C.orange });
      s += t(456, 60, '솔직히 알리고 바로잡음', { a: 'e', size: 14, b: 1, c: C.green });
      s += t(456, 162, '숨김 · 거짓말 → 무너짐', { a: 'e', size: 14, b: 1, c: C.red });
      s += t(150, 198, '작은 정직이 쌓인다', { size: 13, c: C.blue });
      return F.svg(480, 244, s);
    } };

  S.intro = { cards: ['ethic|직장 예절'],
    cap: '소개는 아랫사람을 윗사람에게 먼저 · 명함은 일어서서 두 손으로 주고받고 바로 확인한다',
    draw: function () {
      var s = divider(300, 16, 226);
      s += person(54, 96, { fill: C.blueL, c: C.blue }) + person(150, 96) + person(246, 96, { fill: C.orangeL, c: C.orange });
      s += t(54, 152, '신입', { a: 'm', b: 1 }) + t(54, 172, '(아랫사람)', { a: 'm', size: 13, c: C.sub });
      s += t(150, 152, '나', { a: 'm', b: 1 }) + t(150, 172, '(소개하는 사람)', { a: 'm', size: 13, c: C.sub });
      s += t(246, 152, '부장', { a: 'm', b: 1 }) + t(246, 172, '(윗사람)', { a: 'm', size: 13, c: C.sub });
      s += path('M62,76 Q150,20 232,70', { c: C.blue, w: 2.4 }) + poly([[240, 76], [226, 74], [234, 62]], { close: 1, fill: C.blue, c: C.blue, w: 1 });
      s += num(150, 34, 1) + t(150, 60, '먼저 소개', { a: 'm', size: 14, b: 1, c: C.blue });
      s += arrow(228, 200, 74, 200, { c: C.sub, w: 1.6 }) + t(150, 216, '② 그다음 윗사람을 소개', { a: 'm', size: 13, c: C.sub });
      s += box(340, 70, 100, 60, { fill: '#fff', c: C.ink, r: 4, w: 1.8 }) + line(354, 90, 400, 90, { c: C.ink, w: 3 }) + line(354, 104, 426, 104, { c: C.grayM, w: 2 }) + line(354, 114, 416, 114, { c: C.grayM, w: 2 });
      s += ell(340, 126, 16, 10, { fill: C.orangeL, c: C.orange, op: 1 }) + ell(440, 126, 16, 10, { fill: C.orangeL, c: C.orange, op: 1 });
      s += t(390, 40, '명함', { a: 'm', b: 1, size: 17 }) + t(390, 164, '일어서서 두 손으로', { a: 'm', size: 14, b: 1 }) + t(390, 186, '받으면 바로 확인', { a: 'm', size: 14 });
      return F.svg(480, 240, s);
    } };

  return S;
})();
