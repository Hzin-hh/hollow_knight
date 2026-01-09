<script setup lang="ts">
import { ref, computed } from 'vue';

const isArray = Array.isArray;

// --- Types ---
interface Drop {
  iconUrl: string;
  quantity: string;
}

interface GodhomeInfo {
  bossImage: string;
  title: string;
  quote1: string;
  quote2: string;
  pantheon: string;
  hp: { icon: string; text: string }[];
  changes: string;
  footerNote?: string;
}

interface JournalEntry {
  id: number;
  name: string;
  type: 'npc' | 'enemy' | 'boss';
  iconUrl: string;
  fullImageUrl: string;
  description: string;
  hunterNotes: string;
  hp: number | string;
  geo: string;
  journalReq: number;
  drops: Drop[];
  // New fields for detail view sections
  behavior?: string;
  dreamNail?: string[];
  voice?: string[];
  location?: string;
  gallery?: (string | { url: string; caption: string })[];
  trivia?: string | string[];
  references?: string;
  aliases?: string; // For "其他称呼"
  godhome?: GodhomeInfo;
  category?: string; // For NPCs
  spritePos?: { x: number; y: number }; // For CSS Sprite positioning
  gender?: string; // For "性别"
  background?: string; // For "背景故事"
  plot?: string; // For "游戏剧情"
  dialogue?: string; // For "对话"
}

// --- Sprite Configuration ---
const lightboxImage = ref<string | null>(null);

const openLightbox = (url: string) => {
  lightboxImage.value = url;
};

const closeLightbox = () => {
  lightboxImage.value = null;
};

// --- Mock Data ---
const journalData = ref<JournalEntry[]>([
  {
    id: 1,
    name: "小爬虫",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/5/5b/B_Crawlid.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=小爬虫",
    description: "洞穴居民中最弱小的一种。漫无目的地四处游荡。",
    hunterNotes: "简单的爬行生物。它唯一的本能就是游荡，偶尔会从边缘掉下去。几乎不值得挥动骨钉。",
    hp: 8,
    geo: "2",
    journalReq: 45,
    drops: [
      { iconUrl: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/c/c9/Geo.png/40px-Geo.png", quantity: "2" },
      { iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/5/54/Icon_Greed.png", quantity: "3" }
    ],
    behavior: "<p>平时温顺地来回踱步，没有爬墙的能力。它不会主动攻击小骑士，但会造成接触伤害。离开房间后返回就会重生。</p>",
    dreamNail: ["……光明……是危险的……",
                "……黑暗……是安全的……",
                "……好饿……好饿……",
                "……好怕……",
                "……吃东西……什么时候……",
                "……消灭……伤害……",
                "……走开……走开……",
                "……疼痛……"],
    voice: ["无"],
    location: "遗忘十字路，呼啸悬崖，国王山道，苍绿之径，安息之地的蓝湖",
    gallery: ["https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/d/d9/Screenshot_HK_Crawlid_01.png/640px-Screenshot_HK_Crawlid_01.png",
              "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/2/2e/Screenshot_HK_Crawlid_02.png/640px-Screenshot_HK_Crawlid_02.png"
],
    trivia: [
      "小爬虫与暗影的猎人日志条目是默认解锁的。",
      "在众筹阶段更新中它们曾被称为不安的小爬虫（Snittering Crawlid）\n“这些小小的，没有心智的食腐动物真是令人讨厌，它们漫无目的地到处乱爬，寻找食物残渣。”",
      "在游戏发行前的设计里，小爬虫外壳光滑，没有尖刺。",
      "根据游戏内部与公开测试的反馈，跳到小爬虫上会对小骑士造成接触伤害过去的外观设计表现得不明确，因此改成了有刺的样子[3]。",
      "在 Beta 测试版中，小爬虫有刺了，但是比正式版的小，而且没有头上最前面那根刺。",
      "在爱之塔中收藏家的一个罐子里，可以看到一具有着光滑外壳的小爬虫尸体。"
    ],
    references: "https://hkss.huijiwiki.com/wiki/小爬虫"
  },
  {
    id: 2,
    name: "复仇蝇",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/e/e2/B_Vengefly.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=复仇蝇",
    description: "复仇蝇（Vengefly）是《空洞骑士》中的一种普通敌人。它们是飞行的掠食者，栖息在圣巢各处，而复仇蝇之王来自苍绿之径。",
    hunterNotes: "飞行掠食者，无情地追捕猎物。",
    hp: "8",
    geo: "???",
    journalReq: 45,
    drops: [
        { iconUrl: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/c/c9/Geo.png/40px-Geo.png", quantity: "3" },
      { iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/5/54/Icon_Greed.png", quantity: "4" }
    ],
    behavior: "<p>平时在空中盘旋，于一个位置周围微微移动。小骑士进入其注意范围时，它会发出刺耳的叫声，并开始追击小骑士。它们的行动有些类似复仇蝇之王，追击时飞行轨迹是不太明显的曲线，即接近小骑士时会更靠近地面，然后再往前移动一段距离并略微远离地面后，才会转身。</p><p>它们是在游戏中最早也是最初见到的敌人之一。等待它们追来进入近战范围，或是主动靠近以攻击都是可以的。除非长时间脱离其视野，否则它们都会不断朝着小骑士的位置飞行，所以即使不进行移动，只站在同一个位置持续攻击直到杀死它也是可行的。</p><p>复仇蝇离开房间后返回就会重新生成。在苍绿之径，由复仇蝇之王召唤出的复仇蝇也会掉落吉欧。</p>",
    dreamNail: ["……光明……是危险的……",
                "……黑暗……是安全的……",
                "……好饿……好饿……",
                "……好怕……",
                "……吃东西……什么时候……",
                "……消灭……伤害……",
                "……走开……走开……",
                "……疼痛……"],
    voice: ["刺耳的叫声"],
    location: "呼啸悬崖，遗忘十字路，苍绿之径，泪水之城，愚人斗兽场，安息之地的蓝湖",
    gallery: [],
    trivia: [
      "在 Kickstarter 众筹更新日志中，它们被称为嗡嗡作响的复仇蝇（Vengeward Buzzerfly）。“一旦这个飞行的掠食者看见了它的猎物，就会在黑暗中无情地捕猎它。”",
      "由收藏家召唤的复仇蝇会在99秒后停止追逐小骑士。此时它只会像通常发现小骑士之前一样，在一个位置周围微微移动。受到伤害后，它会再度开始追逐小骑士，直到再次经过99秒。",
      "这是因为它们和通常的复仇蝇在代码上存在差异。收藏家召唤的复仇蝇的追逐时间被设定为99秒，而通常的为10秒。并且，其代码还少了关于视野的一行，这意味着追逐时间结束后，它不能发现小骑士，除非被攻击。",
    ],
    references: "https://hkss.huijiwiki.com/wiki/复仇蝇"
  },
  {
    id: 3,
    name: "复仇蝇之王",
    type: 'boss',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/4/41/B_Vengefly_King.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=复仇蝇之王",
    description: "复仇蝇之王（Vengefly King）是《空洞骑士》中一个非主线的小 Boss，也是愚人斗兽场的一个小 Boss。解锁其猎人日志条目需要杀死两只。",
    hunterNotes: "肮脏的生物，喜欢吃被扔在洞里的旧东西。感觉受到威胁的时候会发出让人不舒服的尖叫，所以得赶紧消灭它们。",
    aliases: "反击蝇之王",
    hp: "55 (苍绿之径)\n100 (愚人斗兽场)",
    geo: "65",
    journalReq: 2,
    drops: [
       { iconUrl: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/c/c9/Geo.png/40px-Geo.png", quantity: "65" },
      { iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/5/54/Icon_Greed.png", quantity: "78" }
    ],
    behavior: `<h4>行动模式</h4>
<p>复仇蝇之王会不断飞离小骑士，有两种攻击方式：</p>
<ul>
    <li><b>猛冲</b>：打开它的嘴巴对准小骑士猛扑过去，并在空中划过一个较宽的 U 形轨迹。</li>
    <li><b>啸召</b>：发出尖啸，召唤0-2只复仇蝇。</li>
</ul>
<p>愚人斗兽场中的复仇蝇之王永不使用啸召，仅使用猛冲攻击。</p>
<p>在主流程中，最多啸召10次。</p>
<p>在神居的战斗中，最多啸召 15 次。场地上有4只或以上复仇蝇时不能再啸召，因此最多存在5只。此时仅会猛冲。有两只复仇蝇之王时，则是分别计算，各自召唤的复仇蝇有4只或以上仍在场地后不能再啸召。当复仇蝇之王死亡时，其召唤出的复仇蝇也会随之死亡，即使另一只复仇蝇之王还活着。</p>
<p>主流程中，它嚼着左特的时候也有碰撞伤害，小骑士因此受伤不会让它开始战斗。如果小骑士远离，它只会在初始位置徘徊。</p>
<p>在主流程中，它会在初次飞到小骑士右上方位置时发出如同啸召的战吼。
在神居的战斗中，开战后它就会发出战吼。此战吼不会使小骑士无法行动，并且此时小骑士可以对它造成伤害。</p>

<h4>打法策略</h4>
<p>复仇蝇之王并不总是朝另一端俯冲，而是朝小骑士的方向俯冲，所以如果小骑士也在场地边缘，它可能会原地上下飞行。如果它张开嘴巴准备冲刺，普通的打法是，在它靠近时向上跳，用单纯的下劈造成一些伤害，或使用荒芜俯冲或黑暗降临，或单纯避开它，小跳就高度足够。适当使用冲刺与二段跳的话，就能在一次猛冲中下劈它多次。利用冲刺斩能更容易攻击到远离小骑士的它。</p>
<p>当它召唤出复仇蝇时，尽快将它们杀死，因为场地上存在复仇蝇时，会相对更难躲开复仇蝇之王的攻击，可以通过它们简单地获取灵魂。</p>
<p>躲避它的一次猛冲后，回血时间充足。</p>

<div class="godmaster-divider">
    <img src="https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/8/81/Godmaster_Icon.png/64px-Godmaster_Icon.png" alt="Godmaster">寻神者内容
</div>
<p>即使已超出屏幕边缘，小骑士仍能在它身上不断下劈。当两只复仇蝇之王在同一边飞行时，用深渊尖啸可以对两只一起造成大量伤害。</p>`,
    godhome: {
        bossImage: "https://huiji-public.huijistatic.com/hkss/uploads/f/f0/Statue_Vengefly_King.png",
        title: "复仇蝇之王",
        quote1: "“我守卫于翠绿的土地之上”",
        quote2: "“凶恶的领土之神”",
        pantheon: "大师万神殿，第1个出场<br>圣巢万神殿，第1个出场",
        hp: [
            { icon: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/a/a9/Attuned_Badge.png/60px-Attuned_Badge.png", text: "450" },
            { icon: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/6/6d/Ascended_Badge.png/55px-Ascended_Badge.png", text: "左侧735，右侧430" },
            { icon: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/d/d0/Radiant_Badge.png/59px-Radiant_Badge.png", text: "左侧735，右侧430" }
        ],
        changes: "与主流程战斗场地类似，但平台下没有地面。在进升级与辐辉级难度，另一只复仇蝇之王将在原来那只的对面出现。",
        footerNote: "在圣巢万神殿中，左侧与调谐级相同为450，右侧为190。"
    },
    dreamNail: ["……愤怒……", "……保卫……消灭……", "……光芒……"],
    voice: ["啸声"],
    location: "苍绿之径，愚人斗兽场（勇士的试炼），神居",
    gallery: [
        { url: "https://huiji-public.huijistatic.com/hkss/uploads/c/c8/Screenshot_HK_Vengefly_King_01.png", caption: "苍绿之径的复仇蝇之王和复仇蝇" },
        { url: "https://huiji-public.huijistatic.com/hkss/uploads/5/57/Screenshot_HK_Vengefly_King_02.png", caption: "在愚人斗兽场" },
        { url: "https://huiji-public.huijistatic.com/hkss/uploads/c/c1/Screenshot_HK_Vengefly_King_03.png", caption: "苍绿之径的战斗场地" },
        { url: "https://huiji-public.huijistatic.com/hkss/uploads/d/d4/Godhome_Arena_Vengefly_King.png", caption: "神居的战斗场地" }
    ],
    trivia: [
      "即使未遭遇过复仇蝇之王，它在诸神堂与万神殿也是默认解锁的。因此，其雕像的未解锁文本无法在游戏内看到。",
      "如果第一次不救左特，就不用与在苍绿之径的复仇蝇之王战斗。在勇士的试炼或 Godmaster Icon.png 神居杀死复仇蝇之王后，仍可以解锁猎人日志中复仇蝇之王的条目。",
      "游戏主流程中原本不会显示复仇蝇之王，大型苔藓冲锋者，灵魂战士和奥波路波的 Boss 战标题名称，但在 Godmaster Icon.png 神居的战斗中，它们会显示标题。",
      "无法在获得螳螂爪，导致左特死亡前，获得防御者纹章，蘑菇孢子，吸虫之巢，格林之子，梦之盾或编织者之歌，因此难以在获取它们之后再与苍绿之径的复仇蝇之王战斗，但这些伤害不会使复仇蝇之王开始攻击小骑士。用这种手段在复仇蝇之王仍咬着左特时杀死它，它会正常掉落吉欧，但左特会消失。并且，离开房间后再返回，它会重新生成，仍然咬着左特。",
      "然而，即使伤害高到足以一击在开战前击杀它，也不会出现此情况。左特会正常掉落。",
    ],
    references: "https://hkss.huijiwiki.com/wiki/复仇蝇之王"
  },
  {
    id: 4,
    name: "格鲁兹",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/6/63/B_Gruzzer.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=格鲁兹",
    description: "格鲁兹 （Gruzzer）是《空洞骑士》中的一种敌人。它们是圆圆的、长着小翅膀的虫子，有着干瘪的口器，很少注意周遭的环境。",
    hunterNotes: "它们似乎周遭事物懵懵懂懂，所以很容易捕捉。在路上的时候他们是靠什么指路呢？它们似乎在寻求毁灭。",
    hp: "8",
    geo: "???",
    journalReq: 25,
    drops: [
            { iconUrl: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/c/c9/Geo.png/40px-Geo.png", quantity: "2" },
      { iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/5/54/Icon_Greed.png", quantity: "3" }
    ],
    behavior: "<p>它们飞来飞去，不断撞到墙壁和物体上。接触到实体时会被弹回，改变飞行方向。离开房间后返回就会重新生成。最好跟在它后面攻击它。</p><p>若之前未杀死足够数量，一旦遗忘十字路被感染，格鲁兹将会变得很稀少，使得小骑士更难完成猎人日志。不过，躁郁的毛里克的洞穴入口处仍能找到两只格鲁兹。</p>",
    dreamNail:["……光明……是危险的……",
                "……黑暗……是安全的……",
                "……好饿……好饿……",
                "……好怕……",
                "……吃东西……什么时候……",
                "……消灭……伤害……",
                "……走开……走开……",
                "……疼痛……"],
    voice: ["无"],
    location: "遗忘十字路（左上部），感染的十字路",
    gallery:  [
        { url: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/3/37/Screenshot_HK_Gruzzer_01.png/640px-Screenshot_HK_Gruzzer_01.png", caption: "在电梯间" },
        { url: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/3/35/Screenshot_HK_Gruzzer_03.png/640px-Screenshot_HK_Gruzzer_03.png", caption: "在郁躁的毛里克旁" },
        { url: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/0/0f/Screenshot_HK_Gruzzer_02.png/640px-Screenshot_HK_Gruzzer_02.png", caption: "从格鲁兹之母的尸体中出现" }
    ],
    trivia: "在众筹阶段被称为“呆头蝇（Droobling Muzznik）”。1.5版本后猎人日志需求数从30降至25。",
    references: "https://hkss.huijiwiki.com/wiki/格鲁兹"
  },
  {
    id: 5,
    name: "格鲁兹之母",
    type: 'boss',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/9/9f/B_Gruz_Mother.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=格鲁兹之母",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: [],
    behavior: "<p>平时沉睡，受击后醒来。攻击方式包括：</p><ul><li>冲锋撞击。</li><li>狂暴猛撞（在地面与天花板间反复冲撞）。</li><li>漫无目的地飞行。</li></ul><p>死亡时通常会释放格鲁兹。</p>",
    dreamNail: ["……满了……是时候了……", "……危险……好累……消灭……", "……沉眠……垂死……"],
    voice: ["无"],
    location: "遗忘十字路，愚人斗兽场（勇士的试炼），神居",
    gallery: [],
    trivia: "在众筹阶段被称为“呆头蝇女皇（Empress Muzznik）”。骨钉大师马托房间有一具带肋骨的格鲁兹之母骨架（早期设计残留）。掉落吉欧不受贪婪护符加成。",
    references: "https://hkss.huijiwiki.com/wiki/格鲁兹之母"
  },
  {
    id: 6,
    name: "提克提克",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/9/91/B_Tiktik.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=提克提克",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 7,
    name: "阿司匹德猎手",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/7/71/B_Aspid_Hunter.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=阿司匹德猎手",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 8,
    name: "阿司匹德之母",
    type: 'boss',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/c/c9/B_Aspid_Mother.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=阿司匹德之母",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 9,
    name: "阿司匹德幼体",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/4/41/B_Aspid_Hatchling.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=阿司匹德幼体",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 10,
    name: "戈姆",
    type: 'enemy',
    iconUrl: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/b/b1/B_Goam.png/136px-B_Goam.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=戈姆",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 11,
    name: "游荡躯壳",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/e/ec/B_Wandering_Husk.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=游荡躯壳",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 12,
    name: "有角躯壳",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/c/cf/B_Husk_Hornhead.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=有角躯壳",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 13,
    name: "跳跃躯壳",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/4/4d/B_Leaping_Husk.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=跳跃躯壳",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 14,
    name: "躯壳恶霸",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/6/6a/B_Husk_Bully.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=躯壳恶霸",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 15,
    name: "躯壳战士",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/6/69/B_Husk_Warrior.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=躯壳战士",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 16,
    name: "躯壳守卫",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/1/1b/B_Husk_Guard.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=躯壳守卫",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 17,
    name: "埋葬躯壳",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/6/65/B_Entombed_Husk.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=埋葬躯壳",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 18,
    name: "假骑士",
    type: 'boss',
    iconUrl: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/9/98/B_False_Knight.png/438px-B_False_Knight.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=假骑士",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 19,
    name: "蛆虫",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/5/53/B_Maggot.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=蛆虫",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 20,
    name: "维修虫",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/6/6d/B_Menderbug.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=维修虫",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 21,
    name: "生命籽",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/1/14/B_Lifeseed.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=生命籽",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 22,
    name: "巴德尔",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/4/4c/B_Baldur.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=巴德尔",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 23,
    name: "巴德尔长者",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/5/52/B_Elder_Baldur.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=巴德尔长者",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 24,
    name: "苔藓爬虫",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/c/c1/B_Mosscreep.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=苔藓爬虫",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 25,
    name: "苔藓蝶",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/a/af/B_Mossfly.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=苔藓蝶",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 26,
    name: "苔藓怪",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/4/47/B_Mosskin.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=苔藓怪",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 27,
    name: "爆炸苔藓怪",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/1/1b/B_Volatile_Mosskin.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=爆炸苔藓怪",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 28,
    name: "捕蠢草",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/c/ce/B_Fool_Eater.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=捕蠢草",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 29,
    name: "斯奎特",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/0/05/B_Squit.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=斯奎特",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 30,
    name: "奥波",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/1/13/B_Obble.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=奥波",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 31,
    name: "古尔卡",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/4/4d/B_Gulka.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=古尔卡",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 32,
    name: "面具鸟",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/2/2a/B_Maskfly.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=面具鸟",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 33,
    name: "苔藓冲锋者",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/5/56/B_Moss_Charger.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=苔藓冲锋者",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 34,
    name: "大型苔藓冲锋者",
    type: 'enemy',
    iconUrl: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/6/63/B_Massive_Moss_Charger.png/438px-B_Massive_Moss_Charger.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=大型苔藓冲锋者",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 35,
    name: "苔藓骑士",
    type: 'boss',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/1/19/B_Moss_Knight.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=苔藓骑士",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 36,
    name: "苔藓流浪者",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/8/86/B_Mossy_Vagabond.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=苔藓流浪者",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 37,
    name: "杜兰多",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/6/68/B_Durandoo.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=杜兰多",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 38,
    name: "杜兰达",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/9/95/B_Duranda.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=杜兰达",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 39,
    name: "阿鲁巴",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/c/ce/B_Aluba.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=阿鲁巴",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 40,
    name: "带电光蝇",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/7/71/B_Charged_Lumafly.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=带电光蝇",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 41,
    name: "乌玛",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/8/88/B_Uoma.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=乌玛",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 42,
    name: "欧玛",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/7/7e/B_Ooma.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=欧玛",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 43,
    name: "乌姆",
    type: 'enemy',
    iconUrl: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/4/49/B_Uumuu.png/360px-B_Uumuu.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=乌姆",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 44,
    name: "漫步菇",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/c/c3/B_Ambloom.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=漫步菇",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 45,
    name: "小真菌球",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/b/b9/B_Fungling.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=小真菌球",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 46,
    name: "真菌球",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/1/1c/B_Fungoon.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=真菌球",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 47,
    name: "斯孢格",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/7/72/B_Sporg.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=斯孢格",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 48,
    name: "真菌躯壳",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/1/1a/B_Fungified_Husk.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=真菌躯壳",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 49,
    name: "小蘑菇",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/9/9a/B_Shrumeling.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=小蘑菇",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 50,
    name: "蘑菇战士",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/c/ce/B_Shrumal_Warrior.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=蘑菇战士",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 51,
    name: "蘑菇巨怪",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/c/c8/B_Shrumal_Ogre.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=蘑菇巨怪",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 52,
    name: "螳螂青年",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/6/6f/B_Mantis_Youth.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=螳螂青年",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 53,
    name: "螳螂战士",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/a/ae/B_Mantis_Warrior.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=螳螂战士",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 54,
    name: "螳螂领主",
    type: 'boss',
    iconUrl: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/5/52/B_Mantis_Lords_2.png/344px-B_Mantis_Lords_2.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=螳螂领主",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 55,
    name: "躯壳哨兵",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/2/26/B_Husk_Sentry.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=躯壳哨兵",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 56,
    name: "重型哨兵",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/1/12/B_Heavy_Sentry.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=重型哨兵",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 57,
    name: "有翼哨兵",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/e/ec/B_Winged_Sentry.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=有翼哨兵",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 58,
    name: "长矛哨兵",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/b/b0/B_Lance_Sentry.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=长矛哨兵",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 59,
    name: "错误",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/9/9d/B_Mistake.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=错误",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 60,
    name: "愚蠢",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/2/25/B_Folly.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=愚蠢",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 61,
    name: "灵魂扭曲者",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/b/b6/B_Soul_Twister.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=灵魂扭曲者",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 62,
    name: "灵魂战士",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/0/0c/B_Soul_Warrior.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=灵魂战士",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 63,
    name: "灵魂大师",
    type: 'boss',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/7/72/B_Soul_Master.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=灵魂大师",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 64,
    name: "躯壳公子",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/1/1b/B_Husk_Dandy.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=躯壳公子",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 65,
    name: "怯懦躯壳",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/5/5b/B_Cowardly_Husk.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=怯懦躯壳",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 66,
    name: "暴食躯壳",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/d/dd/B_Gluttonous_Husk.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=暴食躯壳",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 67,
    name: "华丽躯壳",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/3/30/B_Gorgeous_Husk.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=华丽躯壳",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 68,
    name: "大型躯壳哨兵",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/6/63/B_Great_Husk_Sentry.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=大型躯壳哨兵",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 69,
    name: "守望者骑士",
    type: 'boss',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/9/99/B_Watcher_Knight_2.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=守望者骑士",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 70,
    name: "收藏家",
    type: 'boss',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/d/d5/B_Collector.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=收藏家",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 71,
    name: "爆肚蝠",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/7/77/B_Belfly.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=爆肚蝠",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 72,
    name: "翻身怪",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/b/b4/B_Pilflip.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=翻身怪",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 73,
    name: "呼噗",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/5/59/B_Hwurmp.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=呼噗",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 74,
    name: "臭蛋口袋",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/6/69/B_Bluggsac.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=臭蛋口袋",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 75,
    name: "粪虫防御者",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/0/0e/B_Dung_Defender.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=粪虫防御者",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 76,
    name: "白色防御者",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/a/a7/B_White_Defender.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=白色防御者",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 77,
    name: "吸虫幼雏",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/9/92/B_Flukefey.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=吸虫幼雏",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 78,
    name: "吸虫怪",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/f/f3/B_Flukemon.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=吸虫怪",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 79,
    name: "贪食吸虫",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/6/61/B_Flukemunga.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=贪食吸虫",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 80,
    name: "吸虫之母",
    type: 'boss',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/1/1b/B_Flukemarm.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=吸虫之母",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 81,
    name: "晶刺螨",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/b/ba/B_Shardmite.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=晶刺螨",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 82,
    name: "亮背虫",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/4/42/B_Glimback.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=亮背虫",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 83,
    name: "水晶猎手",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/7/7b/B_Crystal_Hunter.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=水晶猎手",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 84,
    name: "水晶爬虫",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/6/6e/B_Crystal_Crawler.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=水晶爬虫",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 85,
    name: "躯壳矿工",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/e/ec/B_Husk_Miner.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=躯壳矿工",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 86,
    name: "结晶躯壳",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/f/f6/B_Crystallised_Husk.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=结晶躯壳",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 87,
    name: "水晶守卫",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/0/02/B_Crystal_Guardian.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=水晶守卫",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 88,
    name: "愤怒复仇蝇",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/6/69/B_Furious_Vengefly.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=愤怒复仇蝇",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 89,
    name: "爆炸格鲁兹",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/7/7b/B_Volatile_Gruzzer.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=爆炸格鲁兹",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 90,
    name: "暴力躯壳",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/7/7d/B_Violent_Husk.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=暴力躯壳",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 91,
    name: "流涎躯壳",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/0/03/B_Slobbering_Husk.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=流涎躯壳",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 92,
    name: "刻尘者",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/0/02/B_Dirtcarver.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=刻尘者",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 93,
    name: "刻尘孵化者",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/5/5f/B_Carver_Hatcher.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=刻尘孵化者",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 94,
    name: "加皮德",
    type: 'enemy',
    iconUrl: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/e/e9/B_Garpede.png/167px-B_Garpede.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=加皮德",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 95,
    name: "尸体爬虫",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/7/71/B_Corpse_Creeper.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=尸体爬虫",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 96,
    name: "深巢幼蛛",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/a/a5/B_Deepling.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=深巢幼蛛",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 97,
    name: "深巢猎手",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/1/18/B_Deephunter.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=深巢猎手",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 98,
    name: "小型编织者",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/5/5b/B_Little_Weaver.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=小型编织者",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 99,
    name: "潜行信徒",
    type: 'enemy',
    iconUrl: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/0/09/B_Stalking_Devout.png/438px-B_Stalking_Devout.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=潜行信徒",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 100,
    name: "诺斯克",
    type: 'boss',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/a/a8/B_Nosk.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=诺斯克",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 101,
    name: "暗影爬虫",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/b/bf/B_Shadow_Creeper.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=暗影爬虫",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 102,
    name: "小型毛里克",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/9/90/B_Lesser_Mawlek.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=小型毛里克",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 103,
    name: "毛鲁克",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/0/02/B_Mawlek.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=毛鲁克",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 104,
    name: "躁郁的毛里克",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/0/02/B_Brooding_Mawlek_2.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=躁郁的毛里克",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 105,
    name: "光籽",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/1/15/B_Lightseed.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=光籽",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 106,
    name: "感染气球",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/f/fc/B_Infected_Balloon.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=感染气球",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 107,
    name: "残破容器",
    type: 'boss',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/0/0f/B_Broken_Vessel_2.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=残破容器",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 108,
    name: "肥波",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/1/13/B_Boofly.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=肥波",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 109,
    name: "原始阿司匹德",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/a/a8/B_Primal_Aspid.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=原始阿司匹德",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 110,
    name: "跳虫",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/2/2d/B_Hopper.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=跳虫",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 111,
    name: "大跳虫",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/6/66/B_Great_Hopper.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=大跳虫",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 112,
    name: "幼虫模仿者",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/5/54/B_Grub_Mimic.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=幼虫模仿者",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 113,
    name: "小蜜蜂",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/1/13/B_Hiveling.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=小蜜蜂",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 114,
    name: "蜂巢士兵",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/6/6e/B_Hive_Soldier.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=蜂巢士兵",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 115,
    name: "蜂巢守卫",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/f/f1/B_Hive_Guardian.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=蜂巢守卫",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 116,
    name: "蜂巢躯壳",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/7/7f/B_Husk_Hive.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=蜂巢躯壳",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 117,
    name: "蜂巢骑士",
    type: 'boss',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/3/3b/B_Hive_Knight.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=蜂巢骑士",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 118,
    name: "多刺躯壳",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/6/6c/B_Spiny_Husk.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=多刺躯壳",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 119,
    name: "鲁多",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/f/f0/B_Loodle.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=鲁多",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 120,
    name: "螳螂佩特拉",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/a/ae/B_Mantis_Petra.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=螳螂佩特拉",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 121,
    name: "螳螂叛徒",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/d/da/B_Mantis_Traitor.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=螳螂叛徒",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 122,
    name: "叛徒领主",
    type: 'boss',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/2/2c/B_Traitor_Lord.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=叛徒领主",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 123,
    name: "尖刺巴德尔",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/5/5e/B_Sharp_Baldur.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=尖刺巴德尔",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 124,
    name: "装甲斯奎特",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/2/2c/B_Armoured_Squit.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=装甲斯奎特",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 125,
    name: "战斗奥波",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/9/9a/B_Battle_Obble.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=战斗奥波",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 126,
    name: "奥波路波",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/0/09/B_Oblobble.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=奥波路波",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 127,
    name: "带盾愚人",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/3/38/B_Shielded_Fool.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=带盾愚人",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 128,
    name: "强壮愚人",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/b/b9/B_Sturdy_Fool.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=强壮愚人",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 129,
    name: "有翼愚人",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/a/ad/B_Winged_Fool.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=有翼愚人",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 130,
    name: "重装愚人",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/b/ba/B_Heavy_Fool.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=重装愚人",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 131,
    name: "死亡鲁多",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/4/47/B_Death_Loodle.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=死亡鲁多",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 132,
    name: "闪电扭曲者",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/5/53/B_Volt_Twister.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=闪电扭曲者",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 133,
    name: "神之驯服者",
    type: 'boss',
    iconUrl: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/d/d3/B_God_Tamer.png/438px-B_God_Tamer.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=神之驯服者",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 134,
    name: "苍白潜伏者",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/6/6b/B_Pale_Lurker.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=苍白潜伏者",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 135,
    name: "左特",
    type: 'boss',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/5/5a/B_Zote.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=左特",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 136,
    name: "灰色王子左特",
    type: 'boss',
    iconUrl: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/1/17/B_Grey_Prince_Zote.png/438px-B_Grey_Prince_Zote.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=灰色王子左特",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 137,
    name: "有翼小左特",
    type: 'boss',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/0/0b/Winged_Zoteling.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=有翼小左特",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 138,
    name: "跳跃小左特",
    type: 'boss',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/8/88/Hopping_Zoteling.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=跳跃小左特",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 139,
    name: "爆炸小左特",
    type: 'boss',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/9/90/Volatile_Zoteling.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=爆炸小左特",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 140,
    name: "泽若",
    type: 'enemy',
    iconUrl: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/e/ed/B_Xero.png/363px-B_Xero.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=泽若",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 141,
    name: "戈布",
    type: 'enemy',
    iconUrl: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/6/6c/B_Gorb.png/265px-B_Gorb.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=戈布",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 142,
    name: "胡长老",
    type: 'enemy',
    iconUrl: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/e/ed/B_Elder_Hu.png/264px-B_Elder_Hu.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=胡长老",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 143,
    name: "马尔穆",
    type: 'enemy',
    iconUrl: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/e/e8/B_Marmu.png/283px-B_Marmu.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=马尔穆",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 144,
    name: "无眼",
    type: 'enemy',
    iconUrl: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/3/3b/B_No_Eyes.png/339px-B_No_Eyes.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=无眼",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 145,
    name: "加利安",
    type: 'enemy',
    iconUrl: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/9/96/B_Galien.png/274px-B_Galien.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=加利安",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 146,
    name: "马科斯",
    type: 'enemy',
    iconUrl: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/6/6b/B_Markoth.png/386px-B_Markoth.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=马科斯",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 147,
    name: "格林亲族新手",
    type: 'boss',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/b/bf/B_Grimmkin_Novice.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=格林亲族新手",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 148,
    name: "格林亲族大师",
    type: 'boss',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/8/83/B_Grimmkin_Master.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=格林亲族大师",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 149,
    name: "格林亲族梦魇",
    type: 'boss',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/e/ee/B_Grimmkin_Nightmare.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=格林亲族梦魇",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 150,
    name: "格林",
    type: 'boss',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/5/5b/B_Grimm.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=格林",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 151,
    name: "梦魇之王",
    type: 'boss',
    iconUrl: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/0/09/B_Nightmare_King.png/297px-B_Nightmare_King.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=梦魇之王",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 152,
    name: "骨钉兄弟奥罗与马托",
    type: 'enemy',
    iconUrl: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/f/f6/B_Oro_and_Mato.png/438px-B_Oro_and_Mato.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=骨钉兄弟奥罗与马托",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 153,
    name: "绘画大师席奥",
    type: 'boss',
    iconUrl: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/9/96/B_Paintmaster_Sheo.png/334px-B_Paintmaster_Sheo.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=绘画大师席奥",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 154,
    name: "伟大骨钉贤者斯莱",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/e/ea/B_Great_Nailsage_Sly.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=伟大骨钉贤者斯莱",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 155,
    name: "翅膀傀儡",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/c/c7/B_Wingmould.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=翅膀傀儡",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 156,
    name: "皇室家臣",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/8/87/B_Royal_Retainer.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=皇室家臣",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 157,
    name: "国王傀儡",
    type: 'boss',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/5/50/B_Kingsmould.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=国王傀儡",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 158,
    name: "同胞",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/b/b3/B_Sibling.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=同胞",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 159,
    name: "虚空卷须",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/b/b3/B_Void_Tendrils.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=虚空卷须",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 160,
    name: "大黄蜂",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/4/4f/B_Hornet_2.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=大黄蜂",
    description: "圣巢废墟的熟练保护者。挥舞着针线，精准致命。",
    hunterNotes: "敏捷而迅速。她的战斗不是出于疯狂，而是出于责任。不要低估她的速度，否则在你拔出骨钉之前就会被刺穿。",
    hp: 900,
    geo: "0",
    journalReq: 1,
    drops: []
  },
  {
    id: 161,
    name: "空洞骑士",
    type: 'boss',
    iconUrl: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/1/12/B_Hollow_Knight.png/438px-B_Hollow_Knight.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=空洞骑士",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 162,
    name: "纯粹容器",
    type: 'boss',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/e/e4/B_Pure_Vessel.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=纯粹容器",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 163,
    name: "辐光",
    type: 'boss',
    iconUrl: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/5/52/B_Radiance.png/423px-B_Radiance.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=辐光",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 164,
    name: "暗影",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/b/b9/B_Shade.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=暗影",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 165,
    name: "猎人的印记",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/c/ce/Hunters_Mark.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=猎人的印记",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 166,
    name: "束缚封印",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/f/fc/B_Seal_of_Binding.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=束缚封印",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 167,
    name: "虚空神像",
    type: 'boss',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/7/7d/B_Void_Idol.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=虚空神像",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
  {
    id: 168,
    name: "风化面具",
    type: 'enemy',
    iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/4/4a/B_Weathered_Mask.png",
    fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=风化面具",
    description: "暂无描述...",
    hunterNotes: "暂无笔记...",
    hp: "???",
    geo: "???",
    journalReq: 1,
    drops: []
  },
]);

const unrecordedData = ref<JournalEntry[]>([
  { id: 201, name: "失败斗士", type: 'boss', iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/d/d5/Failed_Champion.png", fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=失败斗士", description: "暂无描述...", hunterNotes: "暂无笔记...", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 202, name: "战斗姐妹", type: 'boss', iconUrl: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/8/81/Sisters_of_Battle.png/234px-Sisters_of_Battle.png", fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=战斗姐妹", description: "暂无描述...", hunterNotes: "暂无笔记...", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 203, name: "灵魂暴君", type: 'boss', iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/f/fd/Soul_Tyrant.png", fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=灵魂暴君", description: "暂无描述...", hunterNotes: "暂无笔记...", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 204, name: "吸虫幼体", type: 'enemy', iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/1/1b/Fluke_Baby_1.png", fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=吸虫幼体", description: "暂无描述...", hunterNotes: "暂无笔记...", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 205, name: "暴怒守卫", type: 'boss', iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/0/02/B_Crystal_Guardian.png", fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=暴怒守卫", description: "暂无描述...", hunterNotes: "暂无笔记...", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 206, name: "有翼诺斯克", type: 'boss', iconUrl: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/0/01/B_Winged_Nosk.png/286px-B_Winged_Nosk.png", fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=有翼诺斯克", description: "暂无描述...", hunterNotes: "暂无笔记...", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 207, name: "失落近亲", type: 'boss', iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/6/60/Lost_Kin.png", fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=失落近亲", description: "暂无描述...", hunterNotes: "暂无笔记...", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 208, name: "重型小左特", type: 'enemy', iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/8/85/Heavy_Zoteling.png", fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=重型小左特", description: "暂无描述...", hunterNotes: "暂无笔记...", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 209, name: "倒挂小左特", type: 'enemy', iconUrl: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/2/2a/Turret_Zoteling.png/49px-Turret_Zoteling.png", fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=倒挂小左特", description: "暂无描述...", hunterNotes: "暂无笔记...", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 210, name: "瘦高小左特", type: 'enemy', iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/5/5e/Zote_the_Eternal.png", fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=瘦高小左特", description: "暂无描述...", hunterNotes: "暂无笔记...", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 211, name: "左特的头骨", type: 'enemy', iconUrl: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/7/7b/Head_of_Zote.png/227px-Head_of_Zote.png", fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=左特的头骨", description: "暂无描述...", hunterNotes: "暂无笔记...", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 212, name: "吸虫小左特", type: 'enemy', iconUrl: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/2/20/Fluke_Zoteling.png/244px-Fluke_Zoteling.png", fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=吸虫小左特", description: "暂无描述...", hunterNotes: "暂无笔记...", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 213, name: "左特的诅咒", type: 'enemy', iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/2/21/Zote_Salubra.png", fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=左特的诅咒", description: "暂无描述...", hunterNotes: "暂无笔记...", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 214, name: "瑞维克", type: 'npc', iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/9/96/Revek.png", fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=瑞维克", description: "暂无描述...", hunterNotes: "暂无笔记...", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 215, name: "岗哨大黄蜂", type: 'boss', iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/4/4f/B_Hornet_2.png", fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=岗哨大黄蜂", description: "暂无描述...", hunterNotes: "暂无笔记...", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 216, name: "无上辐光", type: 'boss', iconUrl: "https://huiji-public.huijistatic.com/hkss/uploads/f/fd/Absolute_Radiance_Statue.png", fullImageUrl: "https://via.placeholder.com/600x400/0e1016/5c6b7f?text=无上辐光", description: "暂无描述...", hunterNotes: "暂无笔记...", hp: "???", geo: "???", journalReq: 0, drops: [] },
]);

// --- State & Logic ---
const currentView = ref<'menu' | 'detail'>('menu');
const selectedEntryId = ref<number>(journalData.value[0].id);
const activeMenuSection = ref<'intro' | 'bestiary' | 'unrecorded' | 'achievements' | 'other'>('intro');
const activeTab = ref<'journal' | 'npc'>('journal');
const activeNpcCategory = ref<string>('');

// --- NPC Data ---
const npcData = ref<JournalEntry[]>([
  // Merchants
  { id: 1001, 
    name: "忏悔师吉吉", 
    type: 'npc', 
    category: "商贩", 
    iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/9/9f/Jiji_Circle.png", 
    fullImageUrl: "", 
    description: "忏悔师吉吉（Confessor Jiji）是《空洞骑士》中的一名商人 NPC。她是德特茅斯的神秘住民。她可以召唤仍遗留在世间的暗影。", 
    hunterNotes: "如果我们不处理这些遗憾，希望就会从我们身上流失。—— 忏悔师吉吉", 
    hp: "???", 
    geo: "???", 
    journalReq: 0, 
    drops: [],
    gender: "雌性",
    location: "德特茅斯",
    background: "<p>德特茅斯的居民们对于位于他们的墓园外，水晶山峰山脚的那个神秘山洞里的住民好奇已久。曾有人建议强行打开石门一探究竟，但是屋里发出的诡异呻吟声使他们不敢靠近。</p><p>吉吉在屋里沉睡了很长时间，直到小骑士进入山洞时的动静将她唤醒。醒来后，吉吉认为现在这片土地充满了遗憾的污点，并为如果自己再度沉眠后可能会发生在自己身上的事感到不安。</p><p>吉吉在对话中提到了她的主人们，似乎和钢铁之魂吉恩所说的主人是相同的。除她们提及外，游戏中没有任何其他关于这些主人的信息，不过他们似乎和虚空有某种相似。</p>",
    plot: "<p>需要一把简单钥匙打开忏悔师吉吉所在山洞的石门。</p><p>以腐臭蛋为交换，可以让吉吉帮忙把小骑士留在世界其他地方的暗影召唤到山洞里。召唤出暗影时，所有的蜡烛会熄灭，吉吉会躲起来，看上去很害怕，直到小骑士击败暗影才会再出来。召唤完后，小骑士仍然需要击败它以修复自己的灵魂槽，并拿回丢失的吉欧。如果之前小骑士将暗影留在了很难回去的地方，或者暗影携带了很多吉欧，这项服务会很有帮助。</p>",
    dialogue: "啊，又见面了。你最近怎么样？是因为你的遗憾而来找我吗？让我看着你的眼睛……",
    gallery: [
      {url: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/a/a8/Screenshot_HK_Jiji_01.png/480px-Screenshot_HK_Jiji_01.png",caption:"房间"},
      {url: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/b/b3/Screenshot_HK_Jiji_02.png/480px-Screenshot_HK_Jiji_02.png",caption:"吉吉害怕小骑士的暗影"}
    ],
    trivia: [
      "在钢铁之魂模式中，吉吉被钢铁之魂吉恩代替。吉恩会用吉欧交换腐臭蛋。（吉恩提到的爱吃腐臭蛋的朋友可能是她。）",
      "在吉吉移动时可以看到，她有8条腿。",
      "由于游戏漏洞，杀死吉吉召唤出的暗影时，立即离开房间会导致灵魂计保持破碎状态，不会恢复。但仍能取回吉欧，并且吉吉的对话也表示目前没有暗影存在。",
      "根据 Team Cherry 的 Reddit 问答活动回复，可以确认吉吉和吉恩都是雌性。",
      "被格林击败后让吉吉招魂，她也会说“在我们下方的黑暗中”，但死亡地点实际上并非在下方。",
    ],
  },
  { id: 1002,
    name: "伊塞尔达", 
    type: 'npc', 
    category: "商贩", 
    iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/b/bb/Iselda_Circle.png", 
    fullImageUrl: "", 
    description: "伊塞尔达（Iselda）是《空洞骑士》中的一名商人 NPC。她在德特茅斯开店售卖地图与制图工具。", 
    hunterNotes: "你在废墟中过得愉快吗？有时我的丈夫把圣巢说得像一个奇迹，但有时又似乎是可怕、危险的地方。—— 伊塞尔达", 
    hp: "???", 
    geo: "???", 
    journalReq: 0, 
    drops: [],
    aliases:"伊赛尔达",
    gender: "雌性",
    location: "德特茅斯",
    background: "<p>德伊塞尔达曾是一名战士。她放下武器，决定不再战斗，而是和她的丈夫柯尼法一起享受平静的生活。在柯尼法探索欲的驱使下，他们一同来到了圣巢。伊塞尔达很高，但他们在德特茅斯鹿角虫站旁边开的店并不宽敞，他们因为喜欢这个店面的样子而选择了它。</p><p>她时常担心丈夫的健康与安危，希望他能更多地待在家里。柯尼法邀请她加入他的冒险时，总是被她拒绝，不过在柯尼法从圣巢四处探险归来后，她也开始考虑下一次接受他的邀请。尽管她实际上并不热衷于当一名店主，她在考虑客户需求制作地图图针时仍尽心尽力。</p>",
    plot: "<p>伊塞尔达的店铺在小骑士从柯尼法处第一次购买地图，或者进入通往祖先山丘的房间后开张。她售卖地图和制图工具。</p>",
    dialogue: "<p>你是来买地图的吗？本来在这里和你做交易的应该是我的丈夫，但我发现他又去下面了。</p><p>他偶尔会回来给一些新的地图让我摆在店里卖，但我希望他能多花点时间在店里。我对做买卖没什么兴趣。</p>现在，让我看看能卖你什么。</p>",
    gallery: [
      {url: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/f/f2/Screenshot_HK_Iselda_02.png/480px-Screenshot_HK_Iselda_02.png",caption:"开张前的商店外部"},
      {url: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/6/66/Screenshot_HK_Iselda_03.png/480px-Screenshot_HK_Iselda_03.png",caption:"开张后的商店外部"},
      {url: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/8/87/Screenshot_HK_Iselda_01.png/480px-Screenshot_HK_Iselda_01.png",caption:"商店内部"}
    ],
    trivia: [
      "即使没有从伊塞尔达那里购买虫茧图针，由于游戏漏洞，地图上仍会有一个虫茧图针标识出位于废弃电车轨道的生命血茧。",
      "地图店以柯尼法为形象，门上有眼镜一样的装饰。",
      "通过柯尼法对她的人称与她是柯尼法的妻子也可以确认她是雌性。",
      "由于翻译疏忽，在商店未开张时，门上的留言署名为“伊赛尔达和柯尼法”，但其他地方是伊塞尔达。",
      "伊塞尔达有一些未采用的对话。",
    ],
  },
  { id: 1003, name: "食腿者", type: 'npc', category: "商贩", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/3/32/Legeater_Circle.png", fullImageUrl: "", description: "出售易碎护符。", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 1004, name: "小愚人", type: 'npc', category: "商贩", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/4/41/Little_Fool_Circle.png", fullImageUrl: "", description: "愚人斗兽场的接待员。", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 1005, name: "米莉贝利", type: 'npc', category: "商贩", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/a/a6/Millibelle_Circle.png", fullImageUrl: "", description: "提供银行服务。", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 1006, name: "钉子匠", type: 'npc', category: "商贩", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/4/48/Nailsmith_Circle.png", fullImageUrl: "", description: "升级骨钉。", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 1007, name: "文物搜寻者里姆", type: 'npc', category: "商贩", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/1/14/Lemm_Circle.png", fullImageUrl: "", description: "收购古董。", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 1008, name: "萨鲁巴", type: 'npc', category: "商贩", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/2/27/Salubra_Circle.png", fullImageUrl: "", description: "出售护符和护符槽。", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 1009, name: "斯莱", type: 'npc', category: "商贩", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/a/a5/Sly_Circle.png", fullImageUrl: "", description: "德特茅斯的杂货商。", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 1010, name: "钢铁之魂吉恩", type: 'npc', category: "商贩", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/f/fd/Jinn_Circle.png", fullImageUrl: "", description: "收购腐臭蛋（仅限钢铁之魂模式）。", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 1011, name: "老鹿角虫", type: 'npc', category: "商贩", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/f/f9/Stag_Circle.png", fullImageUrl: "", description: "", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 1012, name: "图克", type: 'npc', category: "商贩", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/6/64/Tuk_Circle.png", fullImageUrl: "", description: "", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  
  // Nailmasters
  { id: 1011, name: "骨钉大师马托", type: 'npc', category: "骨钉大师", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/7/7b/Mato_Circle.png", fullImageUrl: "", description: "传授旋风劈。", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 1012, name: "骨钉大师奥罗", type: 'npc', category: "骨钉大师", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/5/52/Oro_Circle.png", fullImageUrl: "", description: "传授冲刺劈。", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 1013, name: "骨钉大师席奥", type: 'npc', category: "骨钉大师", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/f/f2/Sheo_Circle.png", fullImageUrl: "", description: "传授强力劈。", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },

  // Wanderers
  { id: 1014, name: "阿布", type: 'npc', category: "漫游者", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/2/28/Cloth_Circle-2.png", fullImageUrl: "", description: "", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 1015, name: "柯尼法", type: 'npc', category: "漫游者", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/c/c1/Cornifer_Circle.png", fullImageUrl: "", description: "", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 1016, name: "大黄蜂", type: 'npc', category: "漫游者", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/2/29/Hornet_Icon.png", fullImageUrl: "", description: "", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 1017, name: "蘑菇先生", type: 'npc', category: "漫游者", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/f/fe/Mister_Mushroom_Circle.png", fullImageUrl: "", description: "", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { 
    id: 1018, 
    name: "奎若", 
    type: 'npc', 
    category: "漫游者", 
    iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/0/03/Quirrel_Circle-2.png", 
    fullImageUrl: "", 
    description: "好奇的探险家。", 
    hunterNotes: "", 
    hp: "???", 
    geo: "???", 
    journalReq: 0, 
    drops: [],
    aliases: "无名漫游者",
    gender: "男",
    location: "圣巢各处",
    background: "奎若是一个好奇的探险家，他对圣巢的古老遗迹着迷。虽然他看起来只是一个普通的旅行者，但他似乎对这个王国的历史有着特殊的联系。", 
    plot: "在旅途中，小骑士会多次遇到奎若。他会在黑卵圣殿、苍绿之径、真菌荒地、水晶山峰、深邃巢穴和泪水之城等地出现。最终，他在教师档案馆揭示了他的真实身份——莫诺蒙的面具守护者。",
    dialogue: "你好！又见面了。这个古老的王国真是充满了奇迹，不是吗？"
  },
  { id: 1019, name: "提索", type: 'npc', category: "漫游者", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/9/92/Tiso_Circle.png", fullImageUrl: "", description: "寻找竞技场的战士。", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 1020, name: "伟大的左特", type: 'npc', category: "漫游者", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/1/12/Zote_Circle-2.png", fullImageUrl: "", description: "伟大的骑士（自称）。", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },

  // Quest NPCs
  { id: 1021, name: "布蕾塔", type: 'npc', category: "任务 NPC", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/d/dd/Bretta_Circle.png", fullImageUrl: "", description: "", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 1022, name: "守梦者", type: 'npc', category: "任务 NPC", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/d/da/Dreamers_Circle.png", fullImageUrl: "", description: "", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 1023, name: "灰色哀悼者", type: 'npc', category: "任务 NPC", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/2/2b/Grey_Mourner_Circle.png", fullImageUrl: "", description: "", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 1024, name: "猎人", type: 'npc', category: "任务 NPC", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/9/96/Hunter_Circle.png", fullImageUrl: "", description: "", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 1025, name: "先知", type: 'npc', category: "任务 NPC", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/a/a6/Seer_Circle.png", fullImageUrl: "", description: "", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 1026, name: "虫爷爷", type: 'npc', category: "任务 NPC", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/a/ad/Grubfather_Circle.png", fullImageUrl: "", description: "", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  // Others
  { id: 1027, name: "巴冬", type: 'npc', category: "其他", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/3/32/Bardoon_Circle.png", fullImageUrl: "", description: "", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 1028, name: "遥远村庄的虚伪者", type: 'npc', category: "其他", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/a/a7/Royal_Circle.png", fullImageUrl: "", description: "", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 1029, name: "粪虫防御者", type: 'npc', category: "其他", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/5/57/Dung_Defender_Circle.png", fullImageUrl: "", description: "", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 1030, name: "虫长者", type: 'npc', category: "其他", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/5/5b/Elderbug_Circle-2.png", fullImageUrl: "", description: "", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 1031, name: "永恒的艾米丽塔", type: 'npc', category: "其他", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/5/5d/Emlitia_Circle.png", fullImageUrl: "", description: "", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 1032, name: "面具制作师", type: 'npc', category: "其他", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/5/51/Mask_Maker_Circle.png", fullImageUrl: "", description: "", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 1033, name: "助产士", type: 'npc', category: "其他", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/2/2e/Midwife_Circle.png", fullImageUrl: "", description: "", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 1034, name: "苔藓预言家", type: 'npc', category: "其他", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/5/5a/Moss_Prophet_Circle.png", fullImageUrl: "", description: "", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 1035, name: "米拉", type: 'npc', category: "其他", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/4/4f/Myla_Circle.png", fullImageUrl: "", description: "", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 1036, name: "蜗牛萨满", type: 'npc', category: "其他", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/0/0c/Snail_Shaman_Circle.png", fullImageUrl: "", description: "", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 1037, name: "苍白之王", type: 'npc', category: "其他", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/9/91/King_Circle.png", fullImageUrl: "", description: "", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 1038, name: "乌恩", type: 'npc', category: "其他", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/a/a2/Unn_Circle.png", fullImageUrl: "", description: "", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 1039, name: "信念之蛾", type: 'npc', category: "其他", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/8/84/Unnamed_Moth_Circle.png", fullImageUrl: "", description: "", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 1040, name: "白色夫人", type: 'npc', category: "其他", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/9/9c/White_Lady_Circle.png", fullImageUrl: "", description: "", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
  { id: 1041, name: "维洛", type: 'npc', category: "其他", iconUrl: "https://static.wikia.nocookie.net/hollowknight/images/a/ad/Willoh_Circle.png", fullImageUrl: "", description: "", hunterNotes: "", hp: "???", geo: "???", journalReq: 0, drops: [] },
]);

const allEntries = computed(() => [...journalData.value, ...unrecordedData.value, ...npcData.value]);

const sidebarEntries = computed(() => {
  if (activeTab.value === 'journal') {
    return [...journalData.value, ...unrecordedData.value];
  } else if (activeTab.value === 'npc') {
    return npcData.value;
  }
  return [];
});

const npcCategories = computed(() => {
  const categories = ["商贩", "骨钉大师", "漫游者", "任务 NPC", "其他"];
  return categories.map(cat => ({
    name: cat,
    npcs: npcData.value.filter(npc => npc.category === cat)
  }));
});

const selectedEntry = computed(() => {
  return allEntries.value.find(entry => entry.id === selectedEntryId.value) || journalData.value[0];
});

const selectEntry = (id: number) => {
  selectedEntryId.value = id;
  currentView.value = 'detail';
};

const goBack = () => {
  currentView.value = 'menu';
};

const toggleBestiary = () => {
  activeMenuSection.value = activeMenuSection.value === 'bestiary' ? 'intro' : 'bestiary';
};

const toggleUnrecorded = () => {
  activeMenuSection.value = activeMenuSection.value === 'unrecorded' ? 'intro' : 'unrecorded';
};

const switchTab = (tab: 'journal' | 'npc') => {
  activeTab.value = tab;
  currentView.value = 'menu';
  if (tab === 'journal') {
    activeMenuSection.value = 'intro';
  } else {
    activeNpcCategory.value = ''; // Show all or reset
  }
};

const scrollToNpcCategory = (categoryName: string) => {
  activeNpcCategory.value = categoryName;
  setTimeout(() => {
    const element = document.getElementById(`npc-cat-${categoryName}`);
    if (element) {
        // Adjust for sticky header if needed, or just scrollIntoView
        const yOffset = -20; 
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        // element.scrollIntoView({ behavior: 'smooth' });
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, 100);
};

const showIntro = () => {
  activeMenuSection.value = 'intro';
};

const showAchievements = () => {
  activeMenuSection.value = 'achievements';
};

const showOtherInfo = () => {
  activeMenuSection.value = 'other';
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Menu Items
const menuItems = [
  { id: 1, label: "猎人图志", action: showIntro },
  { id: 2, label: "图鉴", action: toggleBestiary, isExpandable: true },
  { id: 3, label: "未记录的敌人", action: toggleUnrecorded, isExpandable: true },
  { id: 5, label: "其他信息", action: showOtherInfo },
  { id: 6, label: "回到顶部", action: scrollToTop },
];

// --- Other Info Data ---
const otherInfoTableData = [
  { area: "一般", enemies: ["小爬虫", "复仇蝇", "复仇蝇之王", "提克提克", "游荡躯壳", "有角躯壳", "跳跃躯壳", "躯壳恶霸", "埋葬躯壳", "生命籽", "巴德尔", "巴德尔长者"] },
  { area: "遗忘十字路", enemies: ["格鲁兹", "格鲁兹之母", "阿司匹德猎手", "阿司匹德之母", "阿司匹德幼体", "戈姆", "躯壳战士", "躯壳守卫", "假骑士", "失败斗士", "蛆虫", "维修虫", "愤怒复仇蝇", "爆炸格鲁兹", "暴力躯壳", "流涎躯壳"] },
  { area: "苔藓群落", enemies: ["苔藓爬虫", "苔藓蝶", "苔藓怪", "爆炸苔藓怪", "捕蠢草", "斯奎特", "奥波", "古尔卡", "面具鸟", "苔藓冲锋者", "大型苔藓冲锋者", "苔藓骑士", "苔藓流浪者", "杜兰多", "杜兰达", "阿鲁巴", "多刺躯壳", "鲁多"] },
  { area: "雾之峡谷", enemies: ["带电光蝇", "乌玛", "欧玛", "乌姆"] },
  { area: "真菌荒地", enemies: ["漫步菇", "小真菌球", "真菌球", "斯孢格", "真菌躯壳", "小蘑菇", "蘑菇战士", "蘑菇巨怪"] },
  { area: "螳螂群落", enemies: ["螳螂青年", "螳螂战士", "螳螂领主", "战斗姐妹", "螳螂佩特拉", "螳螂叛徒", "叛徒领主"] },
  { area: "泪水之城", enemies: ["躯壳哨兵", "重型哨兵", "有翼哨兵", "长矛哨兵", "错误", "愚蠢", "灵魂扭曲者", "灵魂战士", "灵魂大师", "灵魂暴君", "躯壳公子", "怯懦躯壳", "暴食躯壳", "华丽躯壳", "大型躯壳哨兵", "守望者骑士", "收藏家"] },
  { area: "皇家水道", enemies: ["爆肚蝠", "翻身怪", "呼噗", "臭蛋口袋", "粪虫防御者", "白色防御者", "吸虫幼体", "吸虫幼雏", "吸虫怪", "贪食吸虫", "吸虫之母"] },
  { area: "水晶山峰", enemies: ["晶刺螨", "亮背虫", "水晶猎手", "水晶爬虫", "躯壳矿工", "结晶躯壳", "水晶守卫", "暴怒守卫"] },
  { area: "深邃巢穴", enemies: ["刻尘者", "刻尘孵化者", "加皮德", "尸体爬虫", "深巢幼蛛", "深巢猎手", "小型编织者", "潜行信徒", "诺斯克", "有翼诺斯克", "幼虫模仿者"] },
  { area: "古老盆地", enemies: ["暗影爬虫", "小型毛里克", "毛鲁克", "躁郁的毛里克", "光籽", "感染气球", "残破容器", "失落近亲", "翅膀傀儡", "皇室家臣", "国王傀儡", "同胞", "虚空卷须"] },
  { area: "王国边缘", enemies: ["肥波", "原始阿司匹德", "跳虫", "大跳虫"] },
  { area: "蜂巢", enemies: ["小蜜蜂", "蜂巢士兵", "蜂巢守卫", "蜂巢躯壳", "蜂巢骑士"] },
  { area: "愚人斗兽场", enemies: ["尖刺巴德尔", "装甲斯奎特", "战斗奥波", "奥波路波", "带盾愚人", "强壮愚人", "有翼愚人", "重装愚人", "死亡鲁多", "闪电扭曲者", "神之驯服者", "苍白潜伏者"] },
  { area: "左特", enemies: ["左特", "灰色王子左特", "有翼小左特", "跳跃小左特", "爆炸小左特", "重型小左特", "倒挂小左特", "瘦高小左特", "左特的头骨", "吸虫小左特", "左特的诅咒"] },
  { area: "战士之梦", enemies: ["泽若", "戈布", "胡长老", "马尔穆", "无眼", "加利安", "马科斯"] },
  { area: "格林剧团", enemies: ["格林亲族新手", "格林亲族大师", "格林亲族梦魇", "格林", "梦魇之王"] },
  { area: "寻神者", enemies: ["骨钉兄弟奥罗与马托", "绘画大师席奥", "伟大骨钉贤者斯莱", "虚空神像", "风化面具"] },
  { area: "剧情", enemies: ["守护者大黄蜂", "岗哨大黄蜂", "空洞骑士", "纯粹容器", "辐光", "无上辐光", "暗影", "猎人的印记", "束缚封印"] },
];

const getEntryIdByName = (name: string) => {
  const targetName = name.trim();
  if (targetName === '守护者大黄蜂') return 160; // Map to Hornet
  const entry = allEntries.value.find(e => e.name === targetName);
  return entry ? entry.id : null;
};

const jumpToEntry = (name: string) => {
  const id = getEntryIdByName(name);
  if (id) {
    selectEntry(id);
  } else {
    console.warn(`Entry not found: ${name}`);
  }
};
</script>

<template>
  <div class="app-container">
    <!-- Top Navigation Bar -->
    <nav class="top-nav">
      <div class="nav-content">
        <div class="nav-item" :class="{ active: activeTab === 'journal' }" @click="switchTab('journal')">猎人图志</div>
        <div class="nav-item" :class="{ active: activeTab === 'npc' }" @click="switchTab('npc')">NPC</div>
      </div>
    </nav>

    <!-- Main Content Area -->
    <div class="main-content-area">
      
      <!-- View 1: Menu / Landing Page -->
      <div v-if="currentView === 'menu'" class="menu-view">
        <!-- Left Sidebar -->
        <div class="menu-sidebar">
          <!-- Journal Sidebar -->
          <ul v-if="activeTab === 'journal'" class="sidebar-list">
            <li 
              v-for="item in menuItems" 
              :key="item.id" 
              class="sidebar-item"
              :class="{ 'is-active': (item.id === 2 && activeMenuSection === 'bestiary') || (item.id === 3 && activeMenuSection === 'unrecorded') }"
              @click="item.action"
            >
              <div class="sidebar-item-header">
                <span class="item-label">{{ item.label }}</span>
                <span v-if="item.isExpandable" class="expand-icon">
                  {{ (item.id === 2 && activeMenuSection === 'bestiary') || (item.id === 3 && activeMenuSection === 'unrecorded') ? '▼' : '▶' }}
                </span>
              </div>
            </li>
          </ul>

          <!-- NPC Sidebar -->
          <ul v-if="activeTab === 'npc'" class="sidebar-list">
            <li 
              v-for="(cat, idx) in npcCategories" 
              :key="idx" 
              class="sidebar-item"
              :class="{ 'is-active': activeNpcCategory === cat.name }"
              @click="scrollToNpcCategory(cat.name)"
            >
              <div class="sidebar-item-header">
                <span class="item-label">{{ cat.name }}</span>
              </div>
            </li>
            <!-- Back to Top -->
            <li class="sidebar-item" @click="scrollToTop">
               <div class="sidebar-item-header">
                <span class="item-label">回到顶部</span>
              </div>
            </li>
          </ul>
        </div>

        <!-- Right Content (Contextual) -->
        <div class="menu-content">
          <template v-if="activeTab === 'journal'">
          <div v-if="activeMenuSection === 'intro'" class="intro-section">
            <h1>猎人图志</h1>
            <p class="intro-text">
            猎人日志（The Hunter's Journal）是《空洞骑士》中猎人送给小骑士的敌人图鉴。击败敌人后，日志中会新增对应条目。每个条目的文本包含名称，描述和笔记。当某种敌人的击败数到达一定数目时，就可以破译猎人的笔记，可能是猎人对该敌人的评价、打法的建议、剧情故事的边角，甚至有猎人自己的信息。将日志条目基本破译完成后，就可以获得猎人的印记。
            <br>
            <br>
            猎人日志中可以解锁的条目共有 168 个，其中有 4 个不计入条目总数：猎人的印记、Grimm Troupe Icon.png 束缚封印、Godmaster Icon.png 虚空神像、 Godmaster Icon.png 风化面具，也就是说条目总数最多为 164。
            <br>
            <br>
            获得日志时，会显示以下提示语：
            <br>
            <br>
            “按下物品栏键，以打开“菜单”，然后导航到“日记”窗格。
            击败敌人可以在日志中添加新条目并破译猎人的笔记。”
            初次杀死新敌人时，左下角会显示图标和“新增日志条目”的提示。初次完整解锁条目时，左下角会显示图标和“日志已更新”的提示。两种提示在初次触发后均仅显示图标。
            <br>
            <br>
            获得世界感知能力后，日志中会显示遇到的敌人总数和完成日志所需的敌人总数。
            </p>
          </div>

          <!-- Expandable Bestiary List -->
          <Transition name="expand">
            <div v-if="activeMenuSection === 'bestiary'" class="bestiary-list-container">
              <div class="bestiary-grid">
                <div 
                  v-for="entry in journalData" 
                  :key="entry.id" 
                  class="bestiary-card"
                  @click="selectEntry(entry.id)"
                >
                  <div class="card-image">
                    <img :src="entry.iconUrl" :alt="entry.name" />
                  </div>
                  <div class="card-name">{{ entry.name }}</div>
                </div>
              </div>
            </div>
          </Transition>

          <!-- Unrecorded Enemies List -->
          <Transition name="expand">
            <div v-if="activeMenuSection === 'unrecorded'" class="bestiary-list-container">
              <div class="bestiary-grid">
                <div 
                  v-for="entry in unrecordedData" 
                  :key="entry.id" 
                  class="bestiary-card"
                  @click="selectEntry(entry.id)"
                >
                  <div class="card-image">
                    <img :src="entry.iconUrl" :alt="entry.name" />
                  </div>
                  <div class="card-name">{{ entry.name }}</div>
                </div>
              </div>
            </div>
          </Transition>



          <!-- Other Info Section -->
          <div v-if="activeMenuSection === 'other'" class="intro-section">
            <h1>其他信息</h1>
            <div class="other-info-content">
              <p>在猎人日志中，已完成的条目会在图标上显示不同的边框。</p>
              <p>由于翻译的限制或称呼已成为习惯，“敌人”、“猎人”、“愚人”中使用了“人”字，实际上他们都是虫子。</p>
              <p>小爬虫与暗影的猎人日志条目是默认解锁的。</p>
              <p>如果用作弊手段使游戏文件中猎人日志的解锁数变成0，那么猎人日志中条目为空，右边只会显示一只格鲁兹的图像，原本描述的位置则写有 Hunter's notes.（猎人的笔记）。并且，这会引起错误，此时在物品栏中无法从猎人日志翻页查看其他目录。</p>
              <p>有几种不同外观，但是行为没有差异的普通敌人有真菌躯壳，错误，尸体爬虫，皇室家臣，同胞们。</p>
              <p>Boss 一般不会刷新，但大多数非 Boss 的敌人会。也有少数敌人永远不会重新生成：蛆虫，巴德尔长者，华丽躯壳，臭蛋口袋，幼虫模仿者，乌恩之湖岸边的一位苔藓骑士，以及卢瑞恩的怯懦躯壳管家。属于遭遇战的敌人大部分不会刷新。</p>
              <p>部分敌人满足一定条件后不再出现，如部分光籽，遗忘十字路转化为感染的十字路前的部分敌人，破坏特定隐藏墙壁后的一个躯壳矿工，爱之塔中打破罐子后的复仇蝇，以及活着的苔藓流浪者等。</p>
              <p>坐上长椅可以刷新所在房间以外在坐长椅前已杀死的敌人，同一房间的敌人不会立即刷新，但会在小骑士再次进入该房间时刷新。升级骨钉也会刷新敌人。大多数敌人需要坐长椅才会重新生成，但少数较弱或特殊的敌人离开房间后返回就会重新生成：</p>
              <p class="highlight-text">
                小爬虫，复仇蝇，格鲁兹，提克提克，阿司匹德猎手，巴德尔，苔藓爬虫，苔藓蝶，斯奎特，奥波，古尔卡，面具鸟，苔藓流浪者，阿鲁巴，乌玛，漫步菇，小真菌球，斯孢格，小蘑菇，螳螂青年，错误，愚蠢，翻身怪，呼噗，吸虫幼雏，晶刺螨，亮背虫，刻尘者，深巢幼蛛，深巢猎手，小型编织者，暗影爬虫，感染气球，跳虫，小蜜蜂，皇室家臣，同胞，吸虫幼体，钉匠铺外的一名躯壳哨兵。
              </p>
              
              <h2 class="table-title">猎人日志</h2>
              <div class="journal-table-container">
                <table class="journal-table">
                  <thead>
                    <tr>
                      <th>区域 / 章节</th>
                      <th>敌人</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in otherInfoTableData" :key="row.area">
                      <td class="area-cell">{{ row.area }}</td>
                      <td class="enemies-cell">
                        <span v-for="(enemy, index) in row.enemies" :key="enemy">
                          <span 
                            class="enemy-link" 
                            :class="{ 'disabled': !getEntryIdByName(enemy) }"
                            @click="jumpToEntry(enemy)"
                          >
                            {{ enemy }}
                          </span>
                          <span v-if="index < row.enemies.length - 1" class="separator"> • </span>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          </template>

          <template v-if="activeTab === 'npc'">
            <div class="bestiary-list-container npc-list-container">
              <div v-for="group in npcCategories" :key="group.name" :id="'npc-cat-' + group.name" class="npc-group">
                  <h2 class="npc-group-title">{{ group.name }}</h2>
                  <div class="npc-grid">
                    <div 
                      v-for="entry in group.npcs" 
                      :key="entry.id" 
                      class="npc-card"
                      @click="selectEntry(entry.id)"
                    >
                      <div class="npc-card-image">
                        <img :src="entry.iconUrl" :alt="entry.name" referrerpolicy="no-referrer" />
                      </div>
                      <div class="npc-card-name">{{ entry.name }}</div>
                    </div>
                  </div>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- View 2: Detail Page (The original design) -->
      <div v-else class="detail-view">
        <button class="back-button" @click="goBack">← 返回图志</button>
        
        <div class="hunter-journal-layout">
          <!-- Column 1: Selection List (Left) - Kept for quick nav inside detail view -->
          <div class="journal-list">
            <!-- New TOC for Detail View -->
            <div class="detail-toc">
              <div class="toc-header">目录</div>
              
              <!-- Journal TOC -->
              <ul v-if="activeTab === 'journal'" class="toc-list">
                <li @click="scrollToSection('section-behavior')">1 行动和打法</li>
                <li v-if="selectedEntry.godhome" @click="scrollToSection('section-godhome')">2 神居</li>
                <li @click="scrollToSection('section-dream')">{{ selectedEntry.godhome ? 3 : 2 }} 梦语</li>
                <li @click="scrollToSection('section-location')">{{ selectedEntry.godhome ? 4 : 3 }} 位置</li>
                <li @click="scrollToSection('section-gallery')">{{ selectedEntry.godhome ? 5 : 4 }} 图库</li>
                <li @click="scrollToSection('section-trivia')">{{ selectedEntry.godhome ? 6 : 5 }} 其他信息</li>
                <li @click="scrollToTop" class="back-to-top">回到顶部</li>
              </ul>

              <!-- NPC TOC -->
              <ul v-if="activeTab === 'npc'" class="toc-list">
                <li @click="scrollToSection('section-background')">1 背景故事</li>
                <li @click="scrollToSection('section-plot')">2 游戏剧情</li>
                <li @click="scrollToSection('section-dialogue')">3 对话</li>
                <li @click="scrollToSection('section-location')">4 位置</li>
                <li @click="scrollToSection('section-gallery')">5 图库</li>
                <li @click="scrollToSection('section-trivia')">6 其他信息</li>
                <li @click="scrollToTop" class="back-to-top">回到顶部</li>
              </ul>
            </div>

            <div class="list-header">
              <h3>图鉴</h3>
              <div class="divider"></div>
            </div>
            <ul class="entries">
              <li 
                v-for="entry in sidebarEntries" 
                :key="entry.id"
                class="entry-item"
                :class="{ 'is-active': selectedEntryId === entry.id }"
                @click="selectEntry(entry.id)"
              >
                <div class="entry-thumbnail">
                  <img :src="entry.iconUrl" :alt="entry.name" />
                </div>
                <span class="entry-name">{{ entry.name }}</span>
              </li>
            </ul>
          </div>

          <!-- Column 2: Main Display (Middle) -->
          <div class="journal-main-display">
            <Transition name="fade-slide" mode="out-in">
              <div :key="selectedEntry.id" class="main-content-wrapper">
                <div class="lore-container">
                  <div class="ornate-divider-top"></div>
                  <p class="description">{{ selectedEntry.description }}</p>
                  <div class="hunter-notes-section">
                    <p class="hunter-notes">"{{ selectedEntry.hunterNotes }}"</p>
                  </div>

                  <!-- New Sections -->
                  <template v-if="activeTab === 'journal'">
                    <div id="section-behavior" class="detail-section">
                      <h3>行动和打法</h3>
                      <div v-if="selectedEntry.behavior" class="rich-text" v-html="selectedEntry.behavior"></div>
                      <p v-else>暂无信息...</p>
                    </div>

                    <!-- Godhome Section -->
                    <div id="section-godhome" class="detail-section" v-if="selectedEntry.godhome">
                      <div class="godhome-header-title">
                          <img src="https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/8/81/Godmaster_Icon.png/64px-Godmaster_Icon.png" alt="Godhome" class="godhome-icon-small">
                          <h3>神居</h3>
                      </div>
                      <div class="godhome-container">
                          <div class="godhome-content">
                              <div class="godhome-left">
                                  <img :src="selectedEntry.godhome.bossImage" :alt="selectedEntry.name + ' Godhome'" />
                              </div>
                              <div class="godhome-right">
                                  <h4 class="godhome-boss-name">{{ selectedEntry.godhome.title }}</h4>
                                  <div class="godhome-quotes">
                                      <p>{{ selectedEntry.godhome.quote1 }}</p>
                                      <p>{{ selectedEntry.godhome.quote2 }}</p>
                                  </div>
                                  <div class="godhome-info-grid">
                                      <div class="info-label">万神殿</div>
                                      <div class="info-value" v-html="selectedEntry.godhome.pantheon"></div>
                                      
                                      <div class="info-label">生命值</div>
                                      <div class="info-value hp-list">
                                          <div v-for="(hp, idx) in selectedEntry.godhome.hp" :key="idx" class="hp-item">
                                              <img :src="hp.icon" class="difficulty-icon" />
                                              <span>{{ hp.text }}</span>
                                          </div>
                                      </div>

                                      <div class="info-label">变化</div>
                                      <div class="info-value">{{ selectedEntry.godhome.changes }}</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="godhome-footer" v-if="selectedEntry.godhome.footerNote">
                          {{ selectedEntry.godhome.footerNote }}
                      </div>
                    </div>

                    <div id="section-dream" class="detail-section">
                      <h3>梦语</h3>
                      <ul v-if="selectedEntry.dreamNail && selectedEntry.dreamNail.length">
                        <li v-for="(line, i) in selectedEntry.dreamNail" :key="i">"{{ line }}"</li>
                      </ul>
                      <p v-else>暂无信息...</p>
                    </div>
                  </template>

                  <template v-if="activeTab === 'npc'">
                      <div id="section-background" class="detail-section">
                        <h3>背景故事</h3>
                        <p v-if="selectedEntry.background" v-html="selectedEntry.background"></p>
                        <p v-else>暂无信息...</p>
                      </div>
                      <div id="section-plot" class="detail-section">
                        <h3>游戏剧情</h3>
                        <p v-if="selectedEntry.plot" v-html="selectedEntry.plot"></p>
                        <p v-else>暂无信息...</p>
                      </div>
                      <div id="section-dialogue" class="detail-section">
                        <h3>对话</h3>
                        <p v-if="selectedEntry.dialogue" v-html="selectedEntry.dialogue"></p>
                        <p v-else>暂无信息...</p>
                      </div>
                  </template>
                  <div id="section-location" class="detail-section">
                    <h3>位置</h3>
                    <p>{{ selectedEntry.location || '暂无信息...' }}</p>
                  </div>
                  <div id="section-gallery" class="detail-section">
                    <h3>图库</h3>
                    <p v-if="!selectedEntry.gallery || !selectedEntry.gallery.length">暂无信息...</p>
                    <div v-else class="gallery-grid">
                      <div v-for="(item, i) in selectedEntry.gallery" :key="i" class="gallery-item" @click="openLightbox(typeof item === 'string' ? item : item.url)">
                        <img :src="typeof item === 'string' ? item : item.url" :alt="selectedEntry.name + ' gallery ' + (i+1)" />
                        <div v-if="typeof item !== 'string' && item.caption" class="gallery-caption">{{ item.caption }}</div>
                      </div>
                    </div>
                  </div>
                  <div id="section-trivia" class="detail-section">
                    <h3>其他信息</h3>
                    <template v-if="selectedEntry.trivia">
                      <ul v-if="isArray(selectedEntry.trivia)">
                        <li v-for="(point, i) in selectedEntry.trivia" :key="i">{{ point }}</li>
                      </ul>
                      <p v-else>{{ selectedEntry.trivia }}</p>
                    </template>
                    <p v-else>暂无信息...</p>
                  </div>

                </div>
              </div>
            </Transition>
          </div>

          <!-- Column 3: Stats Panel (Right) -->
          <div class="journal-stats-panel">
            <div class="entity-image-container">
              <div class="image-glow"></div>
              <img :src="selectedEntry.iconUrl" :alt="selectedEntry.name" class="entity-image" />
            </div>
            <div class="stats-content">
              <h2 class="entity-title">{{ selectedEntry.name }}</h2>
              <div class="stats-divider"></div>
              
              <!-- NPC Specific Stats -->
              <template v-if="activeTab === 'npc'">
                <div class="stat-row" v-if="selectedEntry.aliases">
                  <span class="stat-label">其他称呼</span>
                  <span class="stat-value">{{ selectedEntry.aliases }}</span>
                </div>
                <div class="stat-row" v-if="selectedEntry.gender">
                  <span class="stat-label">性别</span>
                  <span class="stat-value">{{ selectedEntry.gender }}</span>
                </div>
                <div class="stat-row" v-if="selectedEntry.location">
                  <span class="stat-label">位置</span>
                  <span class="stat-value">{{ selectedEntry.location }}</span>
                </div>
              </template>

              <!-- Enemy/Journal Specific Stats -->
              <template v-else>
                <div class="stat-row">
                  <span class="stat-label">生命值</span>
                  <span class="stat-value hp">{{ selectedEntry.hp }}</span>
                </div>
                <div class="stat-row">
                  <span class="stat-label">日志要求</span>
                  <span class="stat-value">{{ selectedEntry.journalReq }}</span>
                </div>
                <div class="stat-group">
                  <span class="stat-label block">掉落物</span>
                  <div class="drops-list" v-if="selectedEntry.drops.length > 0">
                    <div v-for="(drop, i) in selectedEntry.drops" :key="i" class="drop-item">
                      <img :src="drop.iconUrl" alt="Drop" class="drop-icon" />
                      <span class="drop-quantity">{{ drop.quantity }}</span>
                    </div>
                  </div>
                  <span v-else class="stat-value none">- 无 -</span>
                </div>
              </template>

              <div class="decorative-sigil"></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- Lightbox Overlay -->
  <Transition name="fade">
    <div v-if="lightboxImage" class="lightbox-overlay" @click="closeLightbox">
      <div class="lightbox-content" @click.stop>
        <button class="lightbox-close" @click="closeLightbox">×</button>
        <img :src="lightboxImage" alt="Full size" />
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
:root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #05070a;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  padding: 0;
  display: block;
  min-width: 320px;
  min-height: 100vh;
  background-color: #05070a;
}

#app {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  text-align: left;
}

// --- Variables ---
$bg-dark: #05070a;
$bg-panel: #0e1016;
$bg-item: #161920;
$bg-item-hover: #1c2029;
$text-main: #c0cad6;
$text-highlight: #e0f7fa;
$text-lore: #aab6c4;
$accent-blue: #00eaff;
$accent-glow: rgba(0, 234, 255, 0.3);
$accent-orange: #ff9d00;
$border-color: #2c3e50;
$border-ornate: #4a5d70;
$font-title: 'Cinzel', 'Times New Roman', serif;
$font-body: 'Lato', 'Segoe UI', sans-serif;

.app-container {
  background-color: $bg-dark;
  min-height: 100vh; /* 最小高度占满屏，但允许无限延伸 */
  width: 100%;
  font-family: $font-body;
  color: $text-main;
  display: flex;
  flex-direction: column;
  /* 删除了 overflow: hidden，删除了 height: 100vh */
}

// --- Top Navigation ---
.top-nav {
  height: 60px;
  background: darken($bg-panel, 5%);
  border-bottom: 1px solid $border-color;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0,0,0,0.5);

  .nav-content {
    display: flex;
    gap: 2rem;
  }

  .nav-item {
    font-family: $font-title;
    text-transform: uppercase;
    cursor: pointer;
    padding: 0.5rem 1rem;
    transition: all 0.3s;
    color: $text-lore;
    letter-spacing: 1px;

    &:hover {
      color: $text-highlight;
      text-shadow: 0 0 5px $accent-blue;
    }

    &.active {
      color: $text-highlight;
      border-bottom: 2px solid $accent-blue;
    }
  }
}

.main-content-area {
  flex-grow: 1;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  /* 删除了 overflow，删除了 height限制 */
}

// --- Menu View ---
.menu-view {
  display: flex;
  padding: 2rem;
  gap: 2rem;
}

.menu-sidebar {
  width: 250px;
  flex-shrink: 0;
  border-right: 1px solid $border-color;
  padding-right: 1rem;
  position: sticky;
  top: 80px; /* 距离顶部的距离 (导航栏高度 + 间距) */
  align-self: flex-start;

  .sidebar-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .sidebar-item {
    padding: 1rem;
    cursor: pointer;
    border-bottom: 1px solid rgba($border-color, 0.3);
    transition: all 0.3s;
    display: block;
    /* justify-content: space-between; Removed */
    /* align-items: center; Removed */
    font-family: $font-title;
    font-size: 1.1rem;

    &:hover {
      background: rgba($accent-blue, 0.1);
      padding-left: 1.5rem; // Animation effect
      color: $text-highlight;
      border-left: 3px solid $accent-blue;
    }
  }
}

.menu-content {
  flex-grow: 1;
  padding: 1rem;
  /* overflow-y: auto;  Removed to allow full page scrolling */

  .intro-section {
    margin-bottom: 3rem;
    h1 {
      font-family: $font-title;
      font-size: 3rem;
      color: $text-highlight;
      margin-bottom: 1rem;
      text-shadow: 0 0 10px rgba($accent-blue, 0.3);
    }
    .intro-text {
      font-size: 1.2rem;
      font-style: italic;
      color: $text-lore;
      max-width: 600px;
    }
  }

  .bestiary-list-container {
    margin-bottom: 3rem;
    background: rgba($bg-panel, 0.5);
    padding: 1rem;
    border: 1px solid $border-ornate;
  }

  .npc-group {
    margin-bottom: 2rem;
  }

  .npc-group-title {
    font-family: $font-title;
    color: $text-highlight;
    border-bottom: 1px solid $border-ornate;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
  }

  .npc-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 1.5rem;
    padding: 1rem;
  }

  .npc-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    cursor: pointer;
    transition: transform 0.2s;
    
    &:hover {
      transform: scale(1.05);
      
      .npc-card-name {
        color: $accent-blue;
      }
    }
  }

  .npc-card-image {
    width: 100px;
    height: 100px;
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    
    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      filter: drop-shadow(0 0 5px rgba(0,0,0,0.5));
    }
  }

  .npc-card-name {
    font-family: $font-title;
    color: $text-highlight;
    font-size: 0.9rem;
  }

  .bestiary-grid {
    display: flex;
    flex-direction: column; // Vertical list as requested
    gap: 1rem;

    .bestiary-card {
      display: flex;
      align-items: center;
      background: $bg-item;
      padding: 1rem;
      border: 1px solid $border-color;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background: $bg-item-hover;
        border-color: $accent-blue;
        transform: translateX(10px);
        
        .card-name {
          color: $text-highlight;
          text-shadow: 0 0 5px $accent-blue;
        }
      }

      .card-image {
        width: 60px;
        height: 60px;
        margin-right: 1.5rem;
        border: 1px solid $border-color;
        background: #000;
        img { width: 100%; height: 100%; object-fit: cover; }
      }

      .card-name {
        font-family: $font-title;
        font-size: 1.2rem;
        color: $text-main;
      }
    }
  }

  .placeholder-section {
    margin-top: 3rem;
    opacity: 0.5;
    border-top: 1px solid $border-color;
    padding-top: 1rem;
  }

  .other-info-content {
    color: $text-main;
    line-height: 1.6;
    
    p { margin-bottom: 1rem; }
    .highlight-text { color: $text-lore; font-style: italic; padding: 1rem; background: rgba(0,0,0,0.2); border-left: 3px solid $accent-blue; }
    
    .table-title { font-family: $font-title; color: $text-highlight; margin-top: 2rem; margin-bottom: 1rem; border-bottom: 1px solid $border-ornate; padding-bottom: 0.5rem; }
    
    .journal-table-container { overflow-x: auto; }
    .journal-table {
      width: 100%; border-collapse: collapse; margin-bottom: 2rem;
      th, td { padding: 0.8rem; text-align: left; border-bottom: 1px solid rgba($border-color, 0.3); }
      th { background: rgba($accent-blue, 0.1); color: $text-highlight; font-family: $font-title; }
      .area-cell { font-weight: bold; color: $text-lore; white-space: nowrap; width: 150px; vertical-align: top; }
      .enemies-cell { line-height: 1.8; }
      .enemy-link { 
        color: $text-main; cursor: pointer; transition: color 0.2s; border-bottom: 1px dotted transparent;
        &:hover { color: $accent-blue; border-bottom-color: $accent-blue; }
        &.disabled { color: darken($text-lore, 20%); cursor: default; &:hover { color: darken($text-lore, 20%); border-bottom-color: transparent; } }
      }
      .separator { color: $border-ornate; margin: 0 0.3rem; }
    }
  }
}

// --- Detail View (Reusing previous styles) ---
.detail-view {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 60px); // Full height minus nav
  /* overflow-y: auto; Removed to fix sticky positioning */
}

.back-button {
  margin: 1rem 2rem;
  align-self: flex-start;
  background: transparent;
  border: 1px solid $border-color;
  color: $text-highlight;
  padding: 0.5rem 1rem;
  font-family: $font-title;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: rgba($accent-blue, 0.1);
    border-color: $accent-blue;
  }
}

.hunter-journal-layout {
  display: flex;
  flex-grow: 1;
  border-top: 1px solid $border-color;
  background: $bg-panel;
  overflow: visible;
  min-height: 0; /* Important for nested flex scrolling */
}

// --- Reused Styles from Previous Version (Scoped to layout) ---
.journal-list {
  width: 250px;
  flex-shrink: 0;
  background-color: rgba(0, 0, 0, 0.4);
  border-right: 1px solid $border-color;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px); /* Fixed height for sticky behavior */
  position: sticky;
  top: 60px; /* Stick to top below nav */
  overflow: hidden; /* Prevent expanding beyond parent */
  
  .list-header {
    padding: 1rem;
    text-align: center;
    background: darken($bg-panel, 2%);
    border-bottom: 1px solid $border-color;
    flex-shrink: 0; /* Don't shrink header */
    h3 { margin: 0; font-family: $font-title; color: $text-highlight; font-size: 1rem; }
  }

  .entries {
    overflow-y: auto;
    flex-grow: 1;
    padding: 0; margin: 0; list-style: none;
    height: 0; /* Force flex child to scroll */
    
    &::-webkit-scrollbar { width: 8px; } /* Slightly wider */
    &::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); }
    &::-webkit-scrollbar-thumb { background: $border-ornate; border-radius: 4px; } /* Brighter color */
    &::-webkit-scrollbar-thumb:hover { background: $accent-blue; }
  }

  .entry-item {
    display: flex; align-items: center; padding: 0.8rem; cursor: pointer;
    border-bottom: 1px solid rgba($border-color, 0.3);
    transition: all 0.2s;
    
    &:hover { background: $bg-item-hover; }
    &.is-active { background: lighten($bg-item, 5%); border-left: 3px solid $accent-blue; }
    
    .entry-thumbnail { width: 32px; height: 32px; margin-right: 0.8rem; border: 1px solid $border-color; img { width: 100%; height: 100%; } }
    .entry-name { font-size: 0.9rem; color: $text-main; }
  }

  /* New TOC Styles */
  .detail-toc {
    padding: 1rem;
    border-top: 1px solid $border-color;
    background: rgba(0, 0, 0, 0.2);
    
    h4 {
      font-family: $font-title;
      color: $text-lore;
      font-size: 0.9rem;
      margin: 0 0 0.5rem 0;
      text-align: center;
      opacity: 0.7;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      
      li {
        padding: 0.4rem 0.8rem;
        font-size: 0.85rem;
        color: $text-main;
        cursor: pointer;
        transition: color 0.2s;
        border-left: 2px solid transparent;

        &:hover {
          color: $accent-blue;
          background: rgba($accent-blue, 0.05);
          border-left-color: $accent-blue;
        }
      }
    }
  }
}

.journal-main-display {
  flex-grow: 1;
  position: relative;
  background: radial-gradient(circle at center, lighten($bg-panel, 5%), $bg-panel);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 2rem;
  /* overflow-y: auto; Removed to allow full page scroll */
  min-height: 600px;
  scroll-behavior: smooth; /* Enable smooth scrolling for the container */

  .main-content-wrapper { width: 100%; max-width: 700px; display: flex; flex-direction: column; align-items: center; }
  
  .lore-container {
    text-align: center; width: 100%;
    .ornate-divider-top { height: 2px; background: linear-gradient(90deg, transparent, $accent-blue, transparent); width: 50%; margin: 0 auto 1.5rem auto; opacity: 0.5; }
    .description { font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem; color: $text-main; }
    .hunter-notes-section { background: rgba(0, 0, 0, 0.3); padding: 1.5rem; border: 1px solid rgba($border-ornate, 0.3); border-radius: 4px; .hunter-notes { font-family: 'Georgia', serif; font-style: italic; color: $text-lore; margin: 0; } }
    
    /* New Detail Sections */
    .detail-section {
      margin-top: 3rem;
      text-align: left;
      border-top: 1px solid rgba($border-color, 0.3);
      padding-top: 1.5rem;

      h3 {
        font-family: $font-title;
        font-size: 1.4rem;
        color: $text-highlight;
        margin-bottom: 1rem;
        border-left: 3px solid $accent-blue;
        padding-left: 0.8rem;
      }
      
      .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 1rem;
        
        .gallery-item {
          cursor: pointer;
          border: 1px solid $border-color;
          transition: transform 0.2s, border-color 0.2s;
          background: rgba(0,0,0,0.2);
          
          &:hover {
            transform: scale(1.05);
            border-color: $accent-blue;
            z-index: 10;
          }
          
          img {
            width: 100%;
            height: 100px;
            object-fit: cover;
            display: block;
          }

          .gallery-caption {
            padding: 0.5rem;
            font-size: 0.8rem;
            text-align: center;
            background: rgba(0,0,0,0.5);
          }
        }
      }

      p, li {
        color: $text-main;
        line-height: 1.6;
        font-size: 1rem;
        white-space: pre-wrap; /* Allow newlines in text */
      }

      ul {
        padding-left: 1.5rem;
        li { margin-bottom: 0.5rem; }
      }
    }
  }
}

.journal-stats-panel {
  width: 300px; flex-shrink: 0; background-color: rgba(0, 0, 0, 0.2); border-left: 1px solid $border-color; padding: 2rem; display: flex; flex-direction: column; justify-content: flex-start;
  height: calc(100vh - 60px); position: sticky; top: 60px; overflow-y: auto;
  
  .entity-image-container {
    position: relative; margin-bottom: 1rem; width: 100%;
    .image-glow { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 200px; height: 200px; background: radial-gradient(circle, rgba($accent-blue, 0.15) 0%, transparent 70%); pointer-events: none; }
    .entity-image { position: relative; z-index: 1; max-height: 250px; width: 100%; object-fit: contain; filter: drop-shadow(0 0 20px rgba(0,0,0,0.5)); animation: float 6s ease-in-out infinite; }
  }

  .stats-content { background: rgba($bg-item, 0.5); padding: 1.5rem; border: 1px solid $border-ornate; box-shadow: 0 0 30px rgba(0,0,0,0.5); position: relative; }
  .entity-title { font-family: $font-title; font-size: 1.5rem; color: $text-highlight; text-align: center; margin: 0 0 1rem 0; }
  .stats-divider { height: 2px; background: linear-gradient(90deg, transparent, $accent-blue, transparent); margin-bottom: 1.5rem; }
  .stat-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.8rem;
    border-bottom: 1px solid rgba($border-color, 0.3);
    padding-bottom: 0.4rem;
    
    .stat-label {
      color: $text-lore;
      font-size: 0.85rem;
      text-transform: uppercase;
      flex-shrink: 0;
      margin-right: 1rem;
    }
    
    .stat-value {
      font-weight: bold;
      text-align: right;
      white-space: pre-wrap; /* Allow newlines */
      
      &.hp { color: $accent-orange; }
      &.geo { color: #ffd700; }
    }
  }
  .stat-group {
    margin-top: 1rem;
    .stat-label.block { display: block; text-align: center; margin-bottom: 0.5rem; font-size: 0.85rem; color: $text-lore; text-transform: uppercase; }
    .drops-list {
      display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center;
      .drop-item {
        background: rgba($accent-blue, 0.1);
        border: 1px solid rgba($accent-blue, 0.3);
        padding: 0.3rem 0.6rem;
        border-radius: 4px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        
        .drop-icon {
          width: 20px;
          height: 20px;
          object-fit: contain;
        }
        
        .drop-quantity {
          font-size: 0.9rem;
          color: $text-highlight;
          font-weight: bold;
        }
      }
    }
  }
  .decorative-sigil { margin-top: 2rem; height: 40px; background: radial-gradient(circle, rgba($border-ornate, 0.5) 2px, transparent 3px); background-size: 10px 10px; opacity: 0.3; mask-image: linear-gradient(to bottom, black, transparent); }
}

// --- Animations ---
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.5s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateY(20px) scale(0.95); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-20px) scale(1.05); }
.expand-enter-active, .expand-leave-active { transition: all 0.5s ease; max-height: 10000px; overflow: hidden; }
.expand-enter-from, .expand-leave-to { max-height: 0; opacity: 0; }

// --- Lightbox Styles ---
.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.lightbox-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  
  img {
    max-width: 100%;
    max-height: 90vh;
    border: 2px solid $border-ornate;
    box-shadow: 0 0 50px rgba(0,0,0,0.8);
  }
}

.lightbox-close {
  position: absolute;
  top: -40px;
  right: -40px;
  background: transparent;
  border: none;
  color: $text-highlight;
  font-size: 2rem;
  cursor: pointer;
  transition: color 0.3s;
  
  &:hover {
    color: $accent-blue;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Rich Text Styles for Behavior Section */
.rich-text {
  color: $text-main;
  line-height: 1.6;
  font-size: 1rem;
  
  h4 {
    font-family: $font-title;
    font-size: 1.5rem;
    color: $text-highlight;
    margin: 2rem 0 1rem 0;
    border-bottom: 1px solid rgba($border-ornate, 0.3);
    padding-bottom: 0.5rem;
  }

  p {
    margin-bottom: 1rem;
  }

  ul {
    padding-left: 1.5rem;
    margin-bottom: 1rem;
    li {
      margin-bottom: 0.5rem;
      strong { color: $text-highlight; }
    }
  }

  .keyword {
    color: #5796e4; /* Blue highlight */
    font-weight: bold;
    cursor: pointer;
    transition: color 0.2s;
    &:hover { color: lighten(#5796e4, 10%); text-decoration: underline; }
  }

  .godmaster-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin: 2rem 0;
    font-family: $font-title;
    color: #f0e6d2; /* Gold/Cream color */
    font-weight: bold;
    opacity: 0.9;
    
    &::before, &::after {
      content: '';
      height: 1px;
      width: 60px;
      background: linear-gradient(90deg, transparent, #f0e6d2, transparent);
      opacity: 0.5;
    }

    img {
      width: 24px;
      height: 24px;
      filter: drop-shadow(0 0 5px rgba(240, 230, 210, 0.5));
    }
  }
}

/* Godhome Section Styles */
.godhome-header-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    
    h3 {
        margin: 0;
    }
}

.godhome-icon-small {
    width: 24px;
    height: 24px;
}

.godhome-container {
    border: 2px solid #d4af37; /* Gold border */
    background: rgba(20, 20, 25, 0.8);
    padding: 1.5rem;
    margin-bottom: 1rem;
    box-shadow: 0 0 15px rgba(212, 175, 55, 0.1);
}

.godhome-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
}

.godhome-left {
    width: 100%;
    display: flex;
    justify-content: center;
    
    img {
        max-width: 250px;
        height: auto;
        filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.1));
    }
}

.godhome-right {
    width: 100%;
}

.godhome-boss-name {
    font-family: $font-title;
    font-size: 1.8rem;
    color: #d4af37; /* Gold */
    text-align: center;
    margin-bottom: 1rem;
}

.godhome-quotes {
    text-align: center;
    margin-bottom: 2rem;
    font-style: italic;

    
    p {
        margin: 0.2rem 0;
    }
}

.godhome-info-grid {
    display: grid;
    grid-template-columns: 100px 1fr;
    gap: 1rem;
    align-items: start;
}

.info-label {
    font-weight: bold;
    color: $text-highlight;
    text-align: right;
}

.info-value {
    color: $text-main;
}

.hp-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.hp-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.difficulty-icon {
    width: 24px;
    height: 24px;
}

.godhome-footer {
    margin-top: 1rem;
    font-size: 0.9rem;

    border-top: 1px solid rgba($border-ornate, 0.3);
    padding-top: 0.5rem;
}

/* NPC Sidebar Styles Override */
.sidebar-item {
    padding: 0 !important; /* Override padding */
}

.sidebar-item:hover {
    background: transparent !important; /* Remove hover from container */
    padding-left: 0 !important;
}

.sidebar-item-header {
    padding: 1rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s;
}

.sidebar-item-header:hover {
    background: rgba(87, 150, 228, 0.1);
    padding-left: 1.5rem;
}

.sidebar-item.is-active .sidebar-item-header {
    color: #5796e4;
}

.sidebar-sublist {
    list-style: none;
    padding: 0;
    margin: 0;
    background: rgba(0, 0, 0, 0.2);
    animation: fadeIn 0.3s ease;
}

.sidebar-subitem {
    padding: 0.8rem 1rem 0.8rem 2rem;
    font-size: 0.95rem;
    color: #8f9bb3;
    cursor: pointer;
    border-left: 3px solid transparent;
    transition: all 0.2s;
}

.sidebar-subitem:hover {
    color: #f0f0f0;
    background: rgba(87, 150, 228, 0.05);
    border-left-color: #5796e4;
}

.npc-group-title {
    font-family: 'Trajan Pro', serif;
    color: #f0f0f0;
    margin: 2rem 0 1rem 0;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #5c6b7f;
    font-size: 1.5rem;
}
</style>
