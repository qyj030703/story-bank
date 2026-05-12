"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";

const DEFAULT_DATA = {
  experiences: [
    { id: "CL", company: "Content Lab", role: "大客户经理实习生", period: "02/2025 – 08/2025", color: "#D8C7A1",
      stories: [
        { id: "CL-01", title: "Govee Prime Day大促——全流程主导", notes: "最核心的campaign经历，面试必讲。\n\n关键数字：17.8M views, 786K engagements, 5.5% ER, 7700+ clicks, 14天首条上线。", star: { s: "Govee需要Prime Day期间覆盖美国和德国的达人营销Campaign。客户常规周期约2个月，但这次brief到上线只有不到1个月。", t: "负责全流程：达人筛选、Brief、内容审核、时间线管理、数据复盘。约25位达人，两个市场，三条产品线。", a: "优先复用历史优秀达人。针对不同产品线制定匹配策略。同时管理10个并行工作流。达人临时drop时提出bonus post策略。完成完整复盘报告。", r: "总播放17.8M+，互动786K+（ER 5.5%），link clicks 7,700+。首条内容14天上线，全部20天完成，压缩周期60%+。" }, questions: [{ q: "Tell me about a campaign you managed end-to-end.", a: "" }, { q: "How do you handle tight deadlines?", a: "" }, { q: "Describe a time things didn't go as planned.", a: "" }, { q: "How do you measure campaign success?", a: "" }] },
        { id: "CL-02", title: "跨市场创意Playbook开发", notes: "展示策略思维和方法论沉淀能力。", star: { s: "CL为多客户在MENA/EU/NA执行Campaign，缺乏系统化框架。", t: "分析跨市场数据，提炼可复用规律。", a: "回顾数十个Campaign。识别受众差异（德国偏实用/家庭，美国偏个性lifestyle）。沉淀为Playbook。", r: "Playbook缩短briefing周期。Govee德国Playbook推动向家庭/情侣类达人策略转向。" }, questions: [{ q: "How do you adapt strategies for different markets?", a: "" }, { q: "Tell me about turning data into a reusable framework.", a: "" }] },
        { id: "CL-03", title: "达人危机管理——临时掉人应急", notes: "Problem-solving类问题用这个。", star: { s: "Govee PD期间多位达人临时drop，威胁交付量。", t: "快速解决，保证交付量和质量。", a: "提出bonus post策略。提前向客户透明沟通风险。建立blacklist/greylist机制。", r: "全部按时交付。Bonus post产出最佳内容。Blacklist成为团队标准。" }, questions: [{ q: "Tell me about something going wrong in a project.", a: "" }, { q: "How do you handle unexpected setbacks?", a: "" }] },
        { id: "CL-04", title: "转化与曝光的策略取舍", notes: "商业sense+数据分析。\n室内点击4,260 | 电视背灯2,421 | 户外1,050", star: { s: "复盘发现：原生内容播放高但点击低，产品向内容反之。", t: "阐述trade-off并提出框架。", a: "分析3产品线×2渠道转化数据。提出三阶段：PD前曝光→PD中转化→PD后开箱。", r: "框架纳入复盘。渠道洞察影响媒体组合建议。" }, questions: [{ q: "How do you balance awareness and conversion?", a: "" }, { q: "Tell me about a data-driven insight.", a: "" }] }
      ] },
    { id: "MT", company: "美团 Meituan", role: "AI产品运营实习生", period: "04/2024 – 09/2024", color: "#D9B8AE",
      stories: [
        { id: "MT-01", title: "用户流失预测模型", notes: "数据分析首选。\n随机森林88.2% AUC 0.86\n阈值：Agent≤4, 轮数≤35, 总≤45\n7种流失模式", star: { s: "儿童AI陪伴产品流失率16%，96%首日即流失。", t: "完整流失研究：指标、画像、根因、建议。", a: "分析50万+用户三维度。建4种模型。提取阈值。抽样聊天记录识别7种流失模式。", r: "阈值用于实时看板。7种模式推动对话引擎重设计。全团队参考框架。" }, questions: [{ q: "Tell me about using data to drive a product decision.", a: "" }, { q: "Describe a complex analysis you did.", a: "" }, { q: "How do you communicate technical findings?", a: "" }] },
        { id: "MT-02", title: "长留用户K-Means分群", notes: "用户研究+产品策略。52用户, 29734条, K=12, 5场景。", star: { s: "团队需理解留存用户为什么留下。", t: "画像高价值用户，识别场景，转化为优先级。", a: "抽样52名用户。大模型标注。四维度K-means（K=12）。识别5个高价值场景。", r: "晚间陪伴=#1优化方向。知识检索推动百科扩展。动机趋势论证共情AI投入。" }, questions: [{ q: "How do you identify your most valuable users?", a: "" }, { q: "How do you translate insights into product priorities?", a: "" }] },
        { id: "MT-03", title: "TikTok达人海外获客", notes: "海外增长。150+→10签约→10万+→11.5%增长。", star: { s: "AI绘画产品拓展美国市场，预算有限。", t: "签约TikTok达人驱动下载。", a: "建立150+达人pipeline，冷启动outreach，签约10位。", r: "10万+播放，一周下载增长11.5%。" }, questions: [{ q: "How do you approach UA in a new market?", a: "" }, { q: "How do you work with influencers on limited budget?", a: "" }] },
        { id: "MT-04", title: "银发经济市场调研", notes: "市场调研。7品类18页。", star: { s: "探索银发AI产品方向。", t: "多品类调研。", a: "调研7大品类，分析市场、玩家、AI应用、需求缺口。", r: "18页报告为战略讨论提供依据。" }, questions: [{ q: "Tell me about a market research project.", a: "" }] }
      ] },
    { id: "TC", company: "腾讯 Tencent", role: "商务运营与拓展实习生", period: "09/2023 – 04/2024", color: "#B7C7D6",
      stories: [
        { id: "TC-01", title: "创造营亚洲——日本本地化", notes: "本地化+跨文化。社媒增长8%。", star: { s: "S级国际化综艺需要日本市场全面适配。", t: "全权负责日本本地化。", a: "翻译本地化。配置日文UI/UX。用户测试。Twitter/LINE内容日历。", r: "日本社媒增长8%。流程被后续项目参考。" }, questions: [{ q: "Tell me about a localization project.", a: "" }, { q: "How do you ensure cultural authenticity?", a: "" }] },
        { id: "TC-02", title: "QQ频道明星直播", notes: "跨团队协调。三天22万+互动。", star: { s: "利用创造营IP为QQ频道导流。", t: "协调明星直播活动。", a: "协调3个团队，管理全流程和实时社区运营。", r: "三天22万+互动，超过基准。" }, questions: [{ q: "Tell me about an event you organized.", a: "" }] }
      ] },
    { id: "GM", company: "游戏公司 Gaming", role: "日本市场运营实习生", period: "~3 months", color: "#CBBBA5",
      stories: [
        { id: "GM-01", title: "ASO关键词策略与季节性CSL", notes: "ASO专业能力。三层框架+4季节。", star: { s: "Screw 3D拓展日本，目标中老年女性。", t: "ASO策略+季节性CSL。", a: "三层关键词框架。密度>3%。区分平台。黄金周/三社祭/夏日CSL。", r: "框架多产品复用。CSL成为模板。" }, questions: [{ q: "Tell me about your ASO experience.", a: "" }] },
        { id: "GM-02", title: "ATT隐私弹窗审计Top 50", notes: "竞品调研+UX。50游戏实测，25页报告。", star: { s: "ATT opt-in率是广告变现关键。", t: "审计Top 50游戏ATT设计。", a: "实机测试50款。案例研究（原神、Pokémon GO）。", r: "25页报告含UI/UX优化建议。" }, questions: [{ q: "Competitive research project?", a: "" }] },
        { id: "GM-03", title: "面向中老年的Push与广告创意", notes: "内容创作+文化适配。", star: { s: "需打动日本中老年女性。", t: "多场景文案。", a: "颜文字、emoji、礼貌表达。按场景建模板。", r: "完整模板库，可复用。" }, questions: [{ q: "Content for unfamiliar demographic?", a: "" }] }
      ] }
  ]
};

const DEFAULT_QB = [
  { id: "gtm", name: "🌸 GTM / Go-To-Market", color: "#D8C7A1", questions: [{ q: "How would you launch a product in a new market?", a: "" }, { q: "Walk me through identifying target customers.", a: "" }, { q: "How do you determine pricing strategy?", a: "" }, { q: "Build a GTM plan from scratch.", a: "" }, { q: "How do you measure launch success?", a: "" }, { q: "How do you prioritize markets?", a: "" }, { q: "Pivoting a GTM strategy?", a: "" }, { q: "Aligning sales, marketing, product?", a: "" }] },
  { id: "growth", name: "🌿 用户增长 / Growth", color: "#D9B8AE", questions: [{ q: "Growth frameworks you know? (AARRR etc.)", a: "" }, { q: "Most impactful growth lever?", a: "" }, { q: "A growth experiment you designed.", a: "" }, { q: "Organic vs. paid growth?", a: "" }, { q: "How to reduce churn?", a: "" }, { q: "Your A/B testing approach?", a: "" }, { q: "Building a referral/viral loop?", a: "" }, { q: "Short-term hacks vs. long-term brand?", a: "" }] },
  { id: "overseas", name: "🍃 海外营销 / Overseas Marketing", color: "#B7C7D6", questions: [{ q: "Adapting campaigns for different cultures?", a: "" }, { q: "Influencer/creator marketing experience?", a: "" }, { q: "How do you select creators?", a: "" }, { q: "Measuring influencer ROI?", a: "" }, { q: "Localization beyond translation?", a: "" }, { q: "Effective platforms in [region]?", a: "" }, { q: "Campaigns across time zones?", a: "" }, { q: "Brand building overseas?", a: "" }] },
  { id: "pmm", name: "🌙 产品营销 / Product Marketing", color: "#CBBBA5", questions: [{ q: "如何定义产品定位？How to define positioning?", a: "" }, { q: "竞品分析方法？Competitive analysis approach?", a: "" }, { q: "不同客群的信息策略？Messaging for segments?", a: "" }, { q: "如何与产品团队协作？Working with product teams?", a: "" }, { q: "如何衡量产品营销效果？Measuring PMM impact?", a: "" }, { q: "新功能上线流程？Feature launch process?", a: "" }, { q: "销售赋能材料？Sales enablement?", a: "" }, { q: "收集整合客户反馈？Customer feedback synthesis?", a: "" }] },
  { id: "data", name: "☁️ 数据分析 / Analytics", color: "#B7C7D6", questions: [{ q: "Analyzing a DAU drop?", a: "" }, { q: "Which metrics to track?", a: "" }, { q: "Data changed your recommendation?", a: "" }, { q: "Insights to non-technical people?", a: "" }, { q: "Analytics tools you use?", a: "" }, { q: "Dashboard for business team?", a: "" }, { q: "Data contradicts hypothesis?", a: "" }] },
  { id: "behavioral", name: "🕊️ 行为面试 / Behavioral", color: "#D8C7A1", questions: [{ q: "Tell me about yourself.（按岗位准备版本）", a: "" }, { q: "Why this role/company?", a: "" }, { q: "Strength and weakness?", a: "" }, { q: "A time you failed.", a: "" }, { q: "Conflict — how resolved?", a: "" }, { q: "Showed leadership.", a: "" }, { q: "Prioritize when everything urgent?", a: "" }, { q: "3-5 year vision?", a: "" }, { q: "Why hire you?", a: "" }, { q: "Questions for us?（准备3-5个）", a: "" }] }
];

const SK = "sb3d", QK = "sb3q";
const ld = (k: string, d: any) => { try { const s = localStorage.getItem(k); return s ? JSON.parse(s) : d; } catch { return d; } };
const sv = (k: string, v: any) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
const gi = () => Date.now().toString(36) + Math.random().toString(36).slice(2,5);

/* ── Floating Particles ── */
function FloatingParticles() {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: 10 + (i * 12) % 85,
    delay: i * 1.8,
    duration: 18 + (i % 4) * 5,
    size: 3 + (i % 3) * 2,
    type: i % 3, // 0=leaf, 1=dot, 2=petal
  }));

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1, overflow: "hidden" }}>
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.35; }
          90% { opacity: 0.35; }
          100% { transform: translateY(-10vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
      {particles.map(p => (
        <div key={p.id} style={{
          position: "absolute",
          left: `${p.left}%`,
          bottom: "-20px",
          width: p.size,
          height: p.size,
          borderRadius: p.type === 1 ? "50%" : "50% 0 50% 0",
          background: p.type === 0 ? "#C4D4B0" : p.type === 1 ? "#D8C7A1" : "#D9B8AE",
          opacity: 0,
          animation: `floatUp ${p.duration}s ease-in-out ${p.delay}s infinite`,
        }} />
      ))}
    </div>
  );
}

/* ── Watercolor Cursor Effect ── */
function WatercolorCursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.left = `${e.clientX}px`;
        ref.current.style.top = `${e.clientY}px`;
        ref.current.style.opacity = "1";
      }
    };
    const hide = () => { if (ref.current) ref.current.style.opacity = "0"; };
    window.addEventListener("mousemove", handler);
    window.addEventListener("mouseleave", hide);
    return () => { window.removeEventListener("mousemove", handler); window.removeEventListener("mouseleave", hide); };
  }, []);
  return (
    <div ref={ref} style={{
      position: "fixed",
      width: 320,
      height: 320,
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(216,199,161,0.08) 0%, rgba(217,184,174,0.04) 40%, transparent 70%)",
      pointerEvents: "none",
      zIndex: 2,
      transform: "translate(-50%, -50%)",
      transition: "left 0.6s ease-out, top 0.6s ease-out, opacity 0.8s ease",
      opacity: 0,
      filter: "blur(20px)",
    }} />
  );
}

/* ── Editable Field ── */
function E({ value, onChange, multi, ph, style, big }: any) {
  const [ed, setEd] = useState(false);
  const [d, setD] = useState(value);
  useEffect(() => setD(value), [value]);
  if (ed) {
    const T = multi ? "textarea" : "input";
    return <T value={d} onChange={(e: any) => setD(e.target.value)} onBlur={() => { onChange(d); setEd(false); }}
      onKeyDown={(e: any) => { if (!multi && e.key === "Enter") { onChange(d); setEd(false); } }}
      autoFocus rows={multi ? 5 : undefined}
      style={{
        ...style, width: "100%", border: "1.5px solid #D8C7A1", borderRadius: 10, padding: big ? "12px 16px" : "8px 12px",
        fontSize: "inherit", fontFamily: "inherit", background: "#FFFDF9", resize: multi ? "vertical" : "none",
        outline: "none", color: "#3A342E", lineHeight: 1.9,
        boxShadow: "0 0 0 4px rgba(216,199,161,0.12)",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }} />;
  }
  return (
    <div onClick={() => setEd(true)} style={{
      ...style, cursor: "text", minHeight: big ? 36 : 24, borderRadius: 8, padding: "4px 6px",
      transition: "background .4s ease", lineHeight: 1.9,
    }}
      onMouseEnter={(e: any) => e.currentTarget.style.background = "rgba(216,199,161,0.08)"}
      onMouseLeave={(e: any) => e.currentTarget.style.background = "transparent"}>
      {value || <span style={{ color: "#C4B8A8", fontStyle: "italic", fontSize: 14 }}>{ph || "点击编辑..."}</span>}
    </div>
  );
}

/* ── Story Detail View ── */
function StoryView({ story, color, onChange, onDelete, onBack }: any) {
  const up = (k: string, v: string) => onChange({ ...story, star: { ...story.star, [k]: v } });
  const uq = (i: number, q: any) => { const qs = [...story.questions]; qs[i] = q; onChange({ ...story, questions: qs }); };
  const dq = (i: number) => { const qs = [...story.questions]; qs.splice(i, 1); onChange({ ...story, questions: qs }); };
  const starLabels: Record<string, string> = { s: "Situation · 情境", t: "Task · 任务", a: "Action · 行动", r: "Result · 结果" };

  return (
    <div style={{ animation: "fadeSlideIn 0.5s ease" }}>
      <div onClick={onBack} className="back-link">← 返回</div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <E value={story.title} onChange={(v: string) => onChange({ ...story, title: v })}
          style={{ fontSize: 26, fontWeight: 600, color: "#3A342E", fontFamily: "var(--f-serif)", flex: 1, letterSpacing: "0.01em" }} big />
        <div style={{ display: "flex", gap: 8, marginLeft: 16 }}>
          <button onClick={() => { const s = story.star; navigator.clipboard.writeText(`【${story.title}】\nS: ${s.s}\nT: ${s.t}\nA: ${s.a}\nR: ${s.r}`); }} className="btn-soft">复制 STAR</button>
          <button onClick={onDelete} className="btn-soft btn-danger">删除</button>
        </div>
      </div>

      {/* STAR Card — soft translucent */}
      <div style={{
        background: `${color}18`,
        borderRadius: 18,
        padding: "32px 36px",
        marginBottom: 28,
        border: `1px solid ${color}40`,
        position: "relative",
        overflow: "hidden",
      }}>
        {/* decorative circle */}
        <div style={{
          position: "absolute", top: -40, right: -40, width: 140, height: 140,
          borderRadius: "50%", background: `${color}12`,
        }} />
        <div style={{
          position: "absolute", bottom: -20, left: -20, width: 80, height: 80,
          borderRadius: "50%", background: `${color}0A`,
        }} />
        {(["s","t","a","r"] as const).map((k) => (
          <div key={k} style={{ marginBottom: 22, position: "relative" }}>
            <div className="label-soft" style={{ color: `${color}CC`, fontWeight: 700 }}>{starLabels[k]}</div>
            <E value={story.star[k]} onChange={(v: string) => up(k, v)} multi ph={`记录你的${starLabels[k]}...`}
              style={{ fontSize: 16, color: "#3A342E", whiteSpace: "pre-wrap" }} />
          </div>
        ))}
      </div>

      {/* Notes */}
      <div className="card-soft" style={{ marginBottom: 28 }}>
        <div className="label-soft" style={{ color: "#C4B8A8" }}>📝 笔记 Notes</div>
        <E value={story.notes} onChange={(v: string) => onChange({ ...story, notes: v })} multi ph="补充笔记..."
          style={{ fontSize: 15, color: "#5A5040", whiteSpace: "pre-wrap" }} />
      </div>

      {/* Questions */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <div className="label-soft">💬 面试问题 ({story.questions.length})</div>
        <button onClick={() => onChange({ ...story, questions: [...story.questions, { q: "", a: "" }] })} className="btn-soft">+ 添加</button>
      </div>
      {story.questions.map((q: any, i: number) => (
        <div key={i} className="card-soft" style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: 2, padding: "3px 10px", borderRadius: 6,
              background: `${color}20`, color: `${color}DD`, fontFamily: "var(--f-mono)",
            }}>Q{i+1}</span>
            <span onClick={() => dq(i)} style={{ fontSize: 12, color: "#C4B8A8", cursor: "pointer", transition: "color 0.3s" }}
              onMouseEnter={(e: any) => e.currentTarget.style.color = "#C4655A"}
              onMouseLeave={(e: any) => e.currentTarget.style.color = "#C4B8A8"}>删除</span>
          </div>
          <E value={q.q} onChange={(v: string) => uq(i, { ...q, q: v })} ph="问题..."
            style={{ fontSize: 16, fontWeight: 500, color: "#3A342E", marginBottom: 14 }} />
          <div className="label-soft">回答 Answer</div>
          <E value={q.a} onChange={(v: string) => uq(i, { ...q, a: v })} multi ph="在这里准备你的回答..."
            style={{ fontSize: 15, color: "#4A4030", whiteSpace: "pre-wrap" }} />
        </div>
      ))}
    </div>
  );
}

/* ── Company View ── */
function CompanyView({ exp, onUpdate, onBack, onSelect }: any) {
  return (
    <div style={{ animation: "fadeSlideIn 0.5s ease" }}>
      <div onClick={onBack} className="back-link">← 返回首页</div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 6 }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: exp.color, opacity: 0.7 }} />
        <E value={exp.company} onChange={(v: string) => onUpdate({ ...exp, company: v })}
          style={{ fontSize: 30, fontWeight: 600, color: "#3A342E", fontFamily: "var(--f-serif)", letterSpacing: "0.01em" }} big />
      </div>
      <div style={{ display: "flex", gap: 14, marginBottom: 36, fontSize: 14, color: "#8E857A", paddingLeft: 26 }}>
        <E value={exp.role} onChange={(v: string) => onUpdate({ ...exp, role: v })} style={{ color: "#8E857A" }} />
        <span style={{ opacity: 0.4 }}>·</span>
        <E value={exp.period} onChange={(v: string) => onUpdate({ ...exp, period: v })} style={{ color: "#8E857A" }} />
      </div>
      {exp.stories.map((s: any, i: number) => {
        const f = s.questions.filter((q: any) => q.a?.trim()).length;
        return (
          <div key={s.id} onClick={() => onSelect(i)} className="story-item"
            style={{ borderLeft: `3px solid ${exp.color}55` }}
            onMouseEnter={(e: any) => {
              e.currentTarget.style.borderLeftColor = exp.color;
              e.currentTarget.style.transform = "scale(1.01)";
              e.currentTarget.style.background = `${exp.color}08`;
            }}
            onMouseLeave={(e: any) => {
              e.currentTarget.style.borderLeftColor = `${exp.color}55`;
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.background = "#FFFDF9";
            }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 600, color: "#3A342E", fontFamily: "var(--f-serif)", marginBottom: 6 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: "#8E857A" }}>
                {s.questions.length > 0 ? `${f}/${s.questions.length} 已准备` : "暂无问题"}{s.notes ? " · 📝" : ""}
              </div>
            </div>
            <div style={{ fontSize: 16, color: exp.color, fontWeight: 400, opacity: 0.6 }}>→</div>
          </div>
        );
      })}
      <div onClick={() => onUpdate({ ...exp, stories: [...exp.stories, { id: gi(), title: "新故事", notes: "", star: { s: "", t: "", a: "", r: "" }, questions: [] }] })}
        className="add-btn-soft">+ 添加新故事</div>
    </div>
  );
}

/* ── Question Bank View ── */
function QBView({ role, onChange, onBack }: any) {
  const uq = (i: number, q: any) => { const qs = [...role.questions]; qs[i] = q; onChange({ ...role, questions: qs }); };
  const dq = (i: number) => { const qs = [...role.questions]; qs.splice(i, 1); onChange({ ...role, questions: qs }); };
  const f = role.questions.filter((q: any) => q.a?.trim()).length;
  return (
    <div style={{ animation: "fadeSlideIn 0.5s ease" }}>
      <div onClick={onBack} className="back-link">← 返回</div>
      <E value={role.name} onChange={(v: string) => onChange({ ...role, name: v })}
        style={{ fontSize: 26, fontWeight: 600, color: "#3A342E", marginBottom: 6, fontFamily: "var(--f-serif)" }} big />
      <div style={{ fontSize: 14, color: "#8E857A", marginBottom: 32 }}>{f}/{role.questions.length} 已准备</div>
      {role.questions.map((q: any, i: number) => (
        <div key={i} className="card-soft" style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: 2, padding: "3px 10px", borderRadius: 6,
              background: `${role.color}20`, color: `${role.color}CC`, fontFamily: "var(--f-mono)",
            }}>Q{i+1}</span>
            <span onClick={() => dq(i)} style={{ fontSize: 12, color: "#C4B8A8", cursor: "pointer", transition: "color 0.3s" }}
              onMouseEnter={(e: any) => e.currentTarget.style.color = "#C4655A"}
              onMouseLeave={(e: any) => e.currentTarget.style.color = "#C4B8A8"}>删除</span>
          </div>
          <E value={q.q} onChange={(v: string) => uq(i, { ...q, q: v })} ph="问题..."
            style={{ fontSize: 16, fontWeight: 500, color: "#3A342E", marginBottom: 14 }} />
          <div className="label-soft">回答 Answer</div>
          <E value={q.a} onChange={(v: string) => uq(i, { ...q, a: v })} multi ph="在这里准备你的回答..."
            style={{ fontSize: 15, color: "#4A4030", whiteSpace: "pre-wrap" }} />
        </div>
      ))}
      <div onClick={() => onChange({ ...role, questions: [...role.questions, { q: "", a: "" }] })} className="add-btn-soft">+ 添加问题</div>
    </div>
  );
}

/* ── Main App ── */
export default function App() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [qb, setQb] = useState(DEFAULT_QB);
  const [ok, setOk] = useState(false);
  const [vw, setVw] = useState<any>({ l: 0 });
  useEffect(() => { setData(ld(SK, DEFAULT_DATA)); setQb(ld(QK, DEFAULT_QB)); setOk(true); }, []);
  useEffect(() => { if (ok) { sv(SK, data); sv(QK, qb); } }, [data, qb, ok]);
  const ue = useCallback((i: number, e: any) => setData((p: any) => { const x = [...p.experiences]; x[i] = e; return { ...p, experiences: x }; }), []);
  const ds = useCallback((ei: number, si: number) => { if (!confirm("确定删除这个故事吗？")) return; setData((p: any) => { const x = [...p.experiences]; const s = [...x[ei].stories]; s.splice(si, 1); x[ei] = { ...x[ei], stories: s }; return { ...p, experiences: x }; }); setVw({ l: 1, ei }); }, []);
  const ts = data.experiences.reduce((a, e) => a + e.stories.length, 0);
  const tq = data.experiences.reduce((a, e) => a + e.stories.reduce((b, s) => b + s.questions.length, 0), 0) + qb.reduce((a, r) => a + r.questions.length, 0);
  const aq = data.experiences.reduce((a, e) => a + e.stories.reduce((b, s) => b + s.questions.filter(q => q.a?.trim()).length, 0), 0) + qb.reduce((a, r) => a + r.questions.filter(q => q.a?.trim()).length, 0);

  return (
    <div style={{ minHeight: "100vh", background: "#F7F4EE", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Nunito:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Noto+Serif+SC:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;600;700&display=swap');

        :root {
          --f-serif: 'Lora', 'Noto Serif SC', Georgia, serif;
          --f-sans: 'Nunito', 'Noto Sans SC', sans-serif;
          --f-mono: 'Nunito', 'Noto Sans SC', sans-serif;
          --bg: #F7F4EE;
          --card: #FFFDF9;
          --text: #3A342E;
          --text2: #8E857A;
          --border: #E7DED2;
        }

        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: var(--f-sans);
          background: var(--bg);
          color: var(--text);
          -webkit-font-smoothing: antialiased;
        }
        textarea { font-family: inherit; }

        ::selection { background: rgba(216,199,161,0.35); color: #3A342E; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.06); border-radius: 4px; }

        /* Paper texture overlay */
        .paper-texture::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.02'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        .back-link {
          font-size: 14px;
          color: #B0A898;
          cursor: pointer;
          margin-bottom: 28px;
          transition: color 0.3s ease;
          display: inline-block;
          font-weight: 500;
        }
        .back-link:hover { color: #8E857A; }

        .card-soft {
          background: var(--card);
          border-radius: 16px;
          padding: 22px 26px;
          border: 1px solid var(--border);
          transition: all 0.4s ease;
        }
        .card-soft:hover {
          box-shadow: 0 6px 28px rgba(0,0,0,0.03);
        }

        .label-soft {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2.5px;
          color: #B0A898;
          margin-bottom: 8px;
          font-family: var(--f-mono);
          text-transform: uppercase;
        }

        .btn-soft {
          background: rgba(216,199,161,0.12);
          color: #8E857A;
          border: 1px solid rgba(216,199,161,0.25);
          border-radius: 10px;
          padding: 8px 16px;
          font-size: 13px;
          cursor: pointer;
          font-weight: 600;
          font-family: var(--f-sans);
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .btn-soft:hover {
          background: rgba(216,199,161,0.22);
          border-color: rgba(216,199,161,0.4);
        }
        .btn-danger {
          color: #C4897A;
          background: rgba(217,184,174,0.1);
          border-color: rgba(217,184,174,0.2);
        }
        .btn-danger:hover {
          background: rgba(217,184,174,0.2);
        }
        .btn-primary {
          background: #3A342E;
          color: #F7F4EE;
          border-color: transparent;
        }
        .btn-primary:hover {
          background: #4A443E;
        }

        .add-btn-soft {
          padding: 20px;
          border-radius: 16px;
          border: 1.5px dashed #DDD6C6;
          text-align: center;
          font-size: 15px;
          color: #B0A898;
          cursor: pointer;
          transition: all 0.4s ease;
          margin-top: 8px;
        }
        .add-btn-soft:hover {
          border-color: #C4B8A8;
          background: rgba(216,199,161,0.04);
        }

        .exp-card-soft {
          background: var(--card);
          border-radius: 18px;
          padding: 28px 32px;
          margin-bottom: 14px;
          border: 1px solid var(--border);
          cursor: pointer;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }
        .exp-card-soft:hover {
          transform: scale(1.008);
          filter: brightness(1.01);
          box-shadow: 0 8px 32px rgba(0,0,0,0.03);
        }

        .story-item {
          background: var(--card);
          border-radius: 14px;
          padding: 22px 26px;
          margin-bottom: 12px;
          border: 1px solid var(--border);
          cursor: pointer;
          transition: all 0.4s ease;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .qb-card-soft {
          background: var(--card);
          border-radius: 14px;
          padding: 20px 22px;
          border: 1px solid var(--border);
          cursor: pointer;
          transition: all 0.4s ease;
        }
        .qb-card-soft:hover {
          transform: scale(1.01);
          filter: brightness(1.01);
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
        }

        .progress-bar-track {
          height: 3px;
          border-radius: 3px;
          background: #EDE6D8;
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.6s ease;
        }
      `}</style>

      <WatercolorCursor />
      <FloatingParticles />

      {/* Paper texture */}
      <div className="paper-texture" />

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "56px 32px 100px", position: "relative", zIndex: 5 }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
          <div onClick={() => setVw({ l: 0 })} style={{ cursor: "pointer" }}>
            <div className="label-soft" style={{ marginBottom: 10, fontSize: 11 }}>INTERVIEW PREPARATION</div>
            <h1 style={{
              fontSize: 38, fontWeight: 600, color: "#3A342E", fontFamily: "var(--f-serif)",
              lineHeight: 1.2, letterSpacing: "0.02em",
            }}>
              Story Garden
              <span style={{ display: "inline-block", marginLeft: 10, fontSize: 24, opacity: 0.4 }}>🌿</span>
            </h1>
            <p style={{ fontSize: 14, color: "#B0A898", marginTop: 10, lineHeight: 1.8 }}>
              {ts} stories · {aq}/{tq} questions prepared
            </p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn-soft btn-primary" onClick={() => {
              /* Build a styled HTML document and open print dialog for PDF export */
              const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<title>Story Garden - Interview Prep</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=Nunito:wght@400;500;600;700&family=Noto+Serif+SC:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Nunito','Noto Sans SC',sans-serif; color: #3A342E; background: #F7F4EE; padding: 48px 56px; line-height: 1.9; }
  h1 { font-family: 'Lora','Noto Serif SC',serif; font-size: 32px; font-weight: 600; margin-bottom: 8px; color: #3A342E; }
  h2 { font-family: 'Lora','Noto Serif SC',serif; font-size: 22px; font-weight: 600; margin: 36px 0 12px; color: #3A342E; page-break-after: avoid; }
  h3 { font-family: 'Lora','Noto Serif SC',serif; font-size: 17px; font-weight: 600; margin: 24px 0 10px; color: #3A342E; page-break-after: avoid; }
  .subtitle { font-size: 14px; color: #8E857A; margin-bottom: 32px; }
  .company-block { margin-bottom: 16px; page-break-inside: avoid; }
  .star-card { background: #FFFDF9; border: 1px solid #E7DED2; border-radius: 14px; padding: 20px 24px; margin-bottom: 16px; page-break-inside: avoid; }
  .star-label { font-size: 11px; font-weight: 700; letter-spacing: 2px; color: #B0A898; margin-bottom: 4px; text-transform: uppercase; }
  .star-text { font-size: 14px; color: #3A342E; margin-bottom: 14px; white-space: pre-wrap; }
  .notes { font-size: 13px; color: #8E857A; font-style: italic; margin-bottom: 12px; white-space: pre-wrap; }
  .q-item { background: #FFFDF9; border: 1px solid #E7DED2; border-radius: 10px; padding: 14px 18px; margin-bottom: 8px; page-break-inside: avoid; }
  .q-label { font-size: 10px; font-weight: 700; letter-spacing: 2px; color: #B0A898; margin-bottom: 4px; }
  .q-text { font-size: 14px; font-weight: 500; color: #3A342E; margin-bottom: 6px; }
  .a-text { font-size: 13px; color: #5A5040; white-space: pre-wrap; }
  hr { border: none; border-top: 1px solid #E7DED2; margin: 32px 0; }
  .section-title { font-family: 'Lora','Noto Serif SC',serif; font-size: 24px; font-weight: 600; margin: 40px 0 20px; color: #3A342E; }
  @media print {
    body { background: white; padding: 32px 40px; }
    .star-card, .q-item { box-shadow: none; }
  }
</style></head><body>
<h1>Story Garden 🌿</h1>
<div class="subtitle">Interview Preparation · 面试故事库</div>
${data.experiences.map(exp => `
<h2>${exp.company}</h2>
<div style="font-size:14px;color:#8E857A;margin-bottom:16px;">${exp.role} · ${exp.period}</div>
${exp.stories.map(s => `
<h3>${s.title}</h3>
${s.notes ? `<div class="notes">📝 ${s.notes}</div>` : ''}
<div class="star-card">
${[['Situation','s'],['Task','t'],['Action','a'],['Result','r']].map(([label,key]) => `
<div class="star-label">${label}</div>
<div class="star-text">${s.star[key] || '—'}</div>
`).join('')}
</div>
${s.questions.length > 0 ? s.questions.map((q,i) => `
<div class="q-item">
<div class="q-label">Q${i+1}</div>
<div class="q-text">${q.q || '—'}</div>
${q.a ? `<div class="a-text">${q.a}</div>` : ''}
</div>`).join('') : ''}
`).join('')}
<hr>
`).join('')}
<div class="section-title">岗位题库</div>
${qb.map(role => `
<h2>${role.name}</h2>
${role.questions.map((q,i) => `
<div class="q-item">
<div class="q-label">Q${i+1}</div>
<div class="q-text">${q.q || '—'}</div>
${q.a ? `<div class="a-text">${q.a}</div>` : ''}
</div>`).join('')}
`).join('')}
</body></html>`;
              const w = window.open('', '_blank');
              if (w) { w.document.write(html); w.document.close(); setTimeout(() => w.print(), 600); }
            }}>📄 导出 PDF</button>
            <button className="btn-soft" onClick={() => { if(confirm("恢复默认数据？")) { setData(DEFAULT_DATA); setQb(DEFAULT_QB); setVw({ l: 0 }); } }}>↺</button>
          </div>
        </div>

        {/* Home */}
        {vw.l === 0 && (
          <div style={{ animation: "fadeSlideIn 0.5s ease" }}>
            {data.experiences.map((exp, idx) => {
              const f = exp.stories.reduce((a, s) => a + s.questions.filter(q => q.a?.trim()).length, 0);
              const t = exp.stories.reduce((a, s) => a + s.questions.length, 0);
              return (
                <div key={exp.id} className="exp-card-soft" onClick={() => setVw({ l: 1, ei: idx })}>
                  {/* Subtle accent bar */}
                  <div style={{
                    position: "absolute", left: 0, top: 0, bottom: 0, width: 4,
                    background: `${exp.color}88`, borderRadius: "18px 0 0 18px",
                  }} />
                  {/* Decorative circle */}
                  <div style={{
                    position: "absolute", top: -30, right: -30, width: 100, height: 100,
                    borderRadius: "50%", background: `${exp.color}0A`,
                  }} />
                  <div style={{ position: "absolute", top: 20, right: 22, fontSize: 12, color: "#C4B8A8", fontFamily: "var(--f-mono)" }}>{exp.period}</div>
                  <div style={{ fontSize: 22, fontWeight: 600, color: "#3A342E", marginBottom: 6, fontFamily: "var(--f-serif)", letterSpacing: "0.01em" }}>{exp.company}</div>
                  <div style={{ fontSize: 15, color: "#8E857A", marginBottom: 12 }}>{exp.role}</div>
                  <div style={{ display: "flex", gap: 20, fontSize: 13, color: "#B0A898" }}>
                    <span>{exp.stories.length} stories</span>
                    <span>{f}/{t} prepared</span>
                  </div>
                </div>
              );
            })}
            <div className="add-btn-soft" onClick={() => setData((p: any) => ({
              ...p, experiences: [...p.experiences, {
                id: gi(), company: "新经历", role: "职位", period: "日期",
                color: ["#D8C7A1","#D9B8AE","#B7C7D6","#CBBBA5"][Math.floor(Math.random()*4)],
                stories: [],
              }]
            }))}>
              + 添加新经历
            </div>

            {/* Divider */}
            <div style={{ margin: "56px 0 36px", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ flex: 1, height: 1, background: "#E7DED2" }} />
              <span style={{ fontSize: 13, color: "#C4B8A8", fontFamily: "var(--f-mono)", letterSpacing: 2 }}>✦</span>
              <div style={{ flex: 1, height: 1, background: "#E7DED2" }} />
            </div>

            {/* Question Bank */}
            <div className="label-soft" style={{ marginBottom: 10 }}>QUESTION BANK</div>
            <h2 style={{ fontSize: 28, fontWeight: 600, color: "#3A342E", marginBottom: 24, fontFamily: "var(--f-serif)", letterSpacing: "0.01em" }}>
              岗位题库
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {qb.map((role, idx) => {
                const f = role.questions.filter(q => q.a?.trim()).length;
                const pct = role.questions.length > 0 ? (f / role.questions.length) * 100 : 0;
                return (
                  <div key={role.id} className="qb-card-soft" onClick={() => setVw({ l: 3, qi: idx })}>
                    <div style={{ fontSize: 16, fontWeight: 600, color: "#3A342E", marginBottom: 8, lineHeight: 1.5 }}>{role.name}</div>
                    <div style={{ fontSize: 13, color: "#B0A898", marginBottom: 10 }}>{f}/{role.questions.length} ready</div>
                    <div className="progress-bar-track">
                      <div className="progress-bar-fill" style={{ width: `${pct}%`, background: `${role.color}88` }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="add-btn-soft" style={{ marginTop: 12 }} onClick={() => setQb((p: any) => [...p, {
              id: gi(), name: "🌱 新岗位",
              color: ["#D8C7A1","#D9B8AE","#B7C7D6","#CBBBA5"][Math.floor(Math.random()*4)],
              questions: [],
            }])}>
              + 添加新岗位
            </div>
          </div>
        )}

        {vw.l === 1 && data.experiences[vw.ei] && (
          <CompanyView
            exp={data.experiences[vw.ei]}
            onUpdate={(e: any) => ue(vw.ei, e)}
            onBack={() => setVw({ l: 0 })}
            onSelect={(si: number) => setVw({ l: 2, ei: vw.ei, si })}
          />
        )}
        {vw.l === 2 && data.experiences[vw.ei]?.stories[vw.si] && (
          <StoryView
            story={data.experiences[vw.ei].stories[vw.si]}
            color={data.experiences[vw.ei].color}
            onChange={(ns: any) => { const e = { ...data.experiences[vw.ei] }; const ss = [...e.stories]; ss[vw.si] = ns; ue(vw.ei, { ...e, stories: ss }); }}
            onDelete={() => ds(vw.ei, vw.si)}
            onBack={() => setVw({ l: 1, ei: vw.ei })}
          />
        )}
        {vw.l === 3 && qb[vw.qi] && (
          <QBView
            role={qb[vw.qi]}
            onChange={(r: any) => { const q = [...qb]; q[vw.qi] = r; setQb(q); }}
            onBack={() => setVw({ l: 0 })}
          />
        )}
      </div>
    </div>
  );
}