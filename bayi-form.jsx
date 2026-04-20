import { useState, useRef } from "react";

const ADMIN_PASSWORD = "bayi2024";

const AirfelLogo = ({ height = 48 }) => (
  <svg height={height} viewBox="0 0 280 85" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="56" fontFamily="Georgia, 'Times New Roman', serif" fontSize="62" fontWeight="700" fill="#9b2226" letterSpacing="-1">airfel</text>
    <text x="3" y="76" fontFamily="Georgia, 'Times New Roman', serif" fontSize="17" fontStyle="italic" fill="#9b2226" letterSpacing="0.3">Daima senden yana</text>
  </svg>
);

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  :root{
    --bg:#f8f7f5;--white:#fff;--surface2:#f4f3f1;
    --border:#e5e3df;--border2:#d4d1cc;
    --accent:#9b2226;--accent-h:#7d1a1d;--accent-light:#fdf0f0;
    --text:#1a1a1a;--text2:#4a4a4a;--muted:#9a9590;
    --success:#2d7a4f;--error:#c0392b;
    --sh:0 1px 3px rgba(0,0,0,.08);--shm:0 4px 12px rgba(0,0,0,.08);--shl:0 8px 28px rgba(0,0,0,.10);
  }
  body{background:var(--bg);color:var(--text);font-family:'Nunito',sans-serif;}
  .app{min-height:100vh;}
  .header{background:var(--white);border-bottom:1px solid var(--border);padding:0 40px;height:72px;display:flex;align-items:center;justify-content:space-between;box-shadow:var(--sh);position:sticky;top:0;z-index:100;}
  .admin-btn{background:transparent;border:1.5px solid var(--border2);color:var(--text2);padding:8px 20px;border-radius:8px;font-size:13.5px;font-weight:600;cursor:pointer;transition:all .18s;font-family:'Nunito',sans-serif;display:flex;align-items:center;gap:6px;}
  .admin-btn:hover{border-color:var(--accent);color:var(--accent);background:var(--accent-light);}
  .hero-band{background:var(--accent);padding:28px 40px;text-align:center;}
  .hero-band h1{font-size:22px;font-weight:800;color:#fff;margin-bottom:4px;}
  .hero-band p{color:rgba(255,255,255,.75);font-size:14px;}
  .form-page{max-width:620px;margin:0 auto;padding:40px 24px 80px;}
  .form-card{background:var(--white);border:1px solid var(--border);border-radius:16px;padding:32px;box-shadow:var(--shm);margin-bottom:20px;}
  .section-header{display:flex;align-items:center;gap:10px;margin-bottom:22px;padding-bottom:14px;border-bottom:1px solid var(--border);}
  .section-icon{width:34px;height:34px;background:var(--accent-light);border-radius:8px;display:flex;align-items:center;justify-content:center;color:var(--accent);flex-shrink:0;}
  .section-title{font-size:15px;font-weight:700;}
  .input-group{display:flex;flex-direction:column;gap:16px;}
  .field-wrap{display:flex;flex-direction:column;gap:6px;}
  .field-label{font-size:13px;font-weight:600;color:var(--text2);}
  .req{color:var(--accent);margin-left:2px;}
  input[type=text],input[type=url],input[type=password]{width:100%;background:var(--surface2);border:1.5px solid var(--border);border-radius:10px;padding:12px 16px;color:var(--text);font-size:14.5px;font-family:'Nunito',sans-serif;font-weight:500;transition:all .18s;outline:none;}
  input:focus{border-color:var(--accent);background:var(--white);box-shadow:0 0 0 3px rgba(155,34,38,.08);}
  input::placeholder{color:#c4c0bb;font-weight:400;}
  .ferr{font-size:12px;color:var(--error);margin-top:4px;}
  .photo-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
  .photo-upload{position:relative;aspect-ratio:4/3;border-radius:12px;border:2px dashed var(--border2);overflow:hidden;cursor:pointer;transition:all .18s;background:var(--surface2);}
  .photo-upload:hover{border-color:var(--accent);background:var(--accent-light);}
  .photo-upload.has-img{border-style:solid;border-color:var(--accent);}
  .photo-upload input{display:none;}
  .ph-placeholder{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:10px;}
  .ph-icon{width:38px;height:38px;background:var(--border);border-radius:10px;display:flex;align-items:center;justify-content:center;color:var(--muted);}
  .ph-title{font-size:12.5px;font-weight:700;color:var(--text2);text-align:center;}
  .ph-sub{font-size:11px;color:var(--muted);text-align:center;}
  .ph-preview{position:absolute;inset:0;object-fit:cover;width:100%;height:100%;}
  .ph-badge{position:absolute;bottom:8px;left:8px;background:var(--accent);color:#fff;font-size:9.5px;font-weight:800;letter-spacing:.8px;text-transform:uppercase;padding:3px 8px;border-radius:4px;}
  .ph-remove{position:absolute;top:8px;right:8px;background:rgba(255,255,255,.9);border:1px solid var(--border);color:var(--text2);width:28px;height:28px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:13px;z-index:2;box-shadow:var(--sh);transition:all .15s;}
  .ph-remove:hover{background:var(--error);color:#fff;border-color:var(--error);}
  .loc-row{display:flex;align-items:center;gap:10px;padding:12px 14px;background:var(--surface2);border-radius:8px;margin-bottom:14px;}
  .loc-dot{width:9px;height:9px;border-radius:50%;background:var(--border2);flex-shrink:0;}
  .loc-dot.active{background:var(--success);box-shadow:0 0 0 3px rgba(45,122,79,.15);}
  .loc-dot.loading{background:var(--accent);animation:blink 1s infinite;}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
  .loc-txt{font-size:13px;font-weight:600;color:var(--muted);}
  .loc-txt.active{color:var(--success);}
  .loc-coords{font-size:12px;color:var(--text2);background:var(--surface2);border:1px solid var(--border);border-radius:7px;padding:8px 12px;font-family:monospace;margin-bottom:12px;}
  .gps-btn{background:var(--white);border:1.5px solid var(--border2);color:var(--text2);padding:10px 18px;border-radius:9px;font-size:13.5px;font-weight:600;cursor:pointer;transition:all .18s;display:flex;align-items:center;gap:7px;font-family:'Nunito',sans-serif;margin-bottom:16px;width:100%;justify-content:center;}
  .gps-btn:hover{border-color:var(--accent);color:var(--accent);background:var(--accent-light);}
  .gps-btn:disabled{opacity:.5;cursor:not-allowed;}
  .or-div{display:flex;align-items:center;gap:12px;margin-bottom:14px;color:var(--muted);font-size:12px;font-weight:600;}
  .or-div::before,.or-div::after{content:'';flex:1;height:1px;background:var(--border);}
  .submit-btn{width:100%;background:var(--accent);color:#fff;border:none;padding:16px;border-radius:12px;font-size:15.5px;font-weight:800;font-family:'Nunito',sans-serif;cursor:pointer;transition:all .2s;box-shadow:0 4px 14px rgba(155,34,38,.25);}
  .submit-btn:hover{background:var(--accent-h);transform:translateY(-1px);box-shadow:0 6px 18px rgba(155,34,38,.3);}
  .submit-btn:disabled{opacity:.5;cursor:not-allowed;transform:none;box-shadow:none;}
  .success-page{max-width:480px;margin:0 auto;padding:80px 24px;text-align:center;}
  .success-icon{width:80px;height:80px;background:#f0faf5;border:2px solid #2d7a4f;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 28px;font-size:32px;}
  .success-title{font-size:26px;font-weight:800;margin-bottom:10px;}
  .success-sub{color:var(--muted);font-size:15px;line-height:1.7;}
  .admin-login{max-width:420px;margin:80px auto;padding:0 24px;}
  .admin-card{background:var(--white);border:1px solid var(--border);border-radius:16px;padding:40px;box-shadow:var(--shl);}
  .admin-card-logo{text-align:center;margin-bottom:28px;}
  .admin-card h2{font-size:20px;font-weight:800;margin-bottom:6px;text-align:center;}
  .admin-card p{color:var(--muted);font-size:13.5px;text-align:center;margin-bottom:28px;}
  .err-banner{background:#fdf2f2;border:1px solid #f5c6c6;color:var(--error);padding:10px 14px;border-radius:8px;font-size:13px;font-weight:600;margin-top:12px;}
  .admin-panel{padding:36px 40px;}
  .admin-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:32px;flex-wrap:wrap;gap:16px;padding-bottom:24px;border-bottom:1px solid var(--border);}
  .admin-top-left{display:flex;align-items:center;gap:16px;}
  .admin-top h2{font-size:22px;font-weight:800;}
  .cnt-badge{background:var(--accent-light);color:var(--accent);border:1.5px solid rgba(155,34,38,.15);padding:5px 14px;border-radius:20px;font-size:13px;font-weight:700;}
  .admin-top-right{display:flex;gap:10px;}
  .export-btn{background:var(--accent);color:#fff;border:none;padding:10px 20px;border-radius:8px;font-size:13.5px;font-weight:700;cursor:pointer;font-family:'Nunito',sans-serif;transition:background .18s;}
  .export-btn:hover{background:var(--accent-h);}
  .logout-btn{background:transparent;border:1.5px solid var(--border2);color:var(--text2);padding:10px 16px;border-radius:8px;font-size:13.5px;font-weight:600;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .18s;}
  .logout-btn:hover{border-color:var(--error);color:var(--error);}
  .empty-state{text-align:center;padding:80px 20px;color:var(--muted);}
  .empty-icon{font-size:48px;margin-bottom:16px;}
  .cards-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:20px;}
  .bayi-card{background:var(--white);border:1px solid var(--border);border-radius:14px;overflow:hidden;box-shadow:var(--sh);transition:all .2s;}
  .bayi-card:hover{box-shadow:var(--shm);transform:translateY(-2px);border-color:var(--border2);}
  .card-photos{display:grid;grid-template-columns:1fr 1fr;height:150px;}
  .card-photo{position:relative;overflow:hidden;background:var(--surface2);display:flex;align-items:center;justify-content:center;cursor:pointer;}
  .card-photo:first-child{border-right:1px solid var(--border);}
  .card-photo img{width:100%;height:100%;object-fit:cover;transition:transform .3s;}
  .card-photo:hover img{transform:scale(1.06);}
  .cp-label{position:absolute;bottom:6px;left:6px;background:rgba(155,34,38,.85);color:#fff;font-size:9px;font-weight:800;letter-spacing:.8px;text-transform:uppercase;padding:3px 7px;border-radius:4px;}
  .card-body{padding:18px 20px;}
  .card-firma{font-size:15.5px;font-weight:800;margin-bottom:3px;}
  .card-ad{font-size:13px;color:var(--muted);margin-bottom:14px;}
  .card-meta{display:flex;flex-direction:column;gap:6px;}
  .card-meta-item{display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--text2);}
  .card-meta-item a{color:var(--accent);text-decoration:none;font-weight:600;}
  .card-meta-item a:hover{text-decoration:underline;}
  .card-date{font-size:11.5px;color:var(--muted);margin-top:12px;padding-top:12px;border-top:1px solid var(--border);}
  .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.8);display:flex;align-items:center;justify-content:center;z-index:1000;padding:20px;backdrop-filter:blur(4px);}
  .modal-img{max-width:90vw;max-height:85vh;border-radius:10px;object-fit:contain;box-shadow:0 20px 60px rgba(0,0,0,.5);}
  .modal-close{position:fixed;top:20px;right:20px;background:rgba(255,255,255,.15);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.2);color:#fff;width:44px;height:44px;border-radius:50%;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s;}
  .modal-close:hover{background:rgba(255,255,255,.25);}
  @media(max-width:600px){.header{padding:0 16px;}.hero-band{padding:20px;}.form-card{padding:20px 16px;}.admin-panel{padding:20px 16px;}.admin-top{flex-direction:column;align-items:flex-start;}}
`;

const STORAGE_KEY = "bayi_submissions_v2";
const loadSubs = () => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; } };
const saveSub = d => { const a = loadSubs(); a.push(d); localStorage.setItem(STORAGE_KEY, JSON.stringify(a)); };

function BayiForm({ onSuccess }) {
  const [adSoyad, setAdSoyad] = useState("");
  const [firma, setFirma] = useState("");
  const [disCephe, setDisCephe] = useState(null);
  const [dukkanIci, setDukkanIci] = useState(null);
  const [coords, setCoords] = useState(null);
  const [mapsLink, setMapsLink] = useState("");
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsErr, setGpsErr] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const r1 = useRef(), r2 = useRef();

  const handlePhoto = (e, setter) => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = ev => setter({ preview: ev.target.result, name: f.name });
    r.readAsDataURL(f);
  };

  const getGPS = () => {
    if (!navigator.geolocation) { setGpsErr("Tarayıcınız GPS desteklemiyor."); return; }
    setGpsLoading(true); setGpsErr("");
    navigator.geolocation.getCurrentPosition(
      p => { setCoords({ lat: p.coords.latitude.toFixed(6), lng: p.coords.longitude.toFixed(6) }); setGpsLoading(false); },
      () => { setGpsErr("Konum alınamadı. İzin verdiğinizden emin olun veya Maps linki girin."); setGpsLoading(false); }
    );
  };

  const validate = () => {
    const e = {};
    if (!adSoyad.trim()) e.adSoyad = "Ad Soyad zorunludur";
    if (!firma.trim()) e.firma = "Firma Ünvanı zorunludur";
    if (!disCephe) e.dis = "Dış cephe fotoğrafı yükleyin";
    if (!dukkanIci) e.ici = "Dükkan içi fotoğrafı yükleyin";
    if (!coords && !mapsLink.trim()) e.konum = "Konum bilgisi zorunludur";
    return e;
  };

  const submit = () => {
    const e = validate(); setErrors(e);
    if (Object.keys(e).length) return;
    setSubmitting(true);
    setTimeout(() => {
      saveSub({ id: Date.now(), adSoyad, firma, disCephe, dukkanIci, coords, mapsLink, tarih: new Date().toLocaleString("tr-TR") });
      setSubmitting(false); onSuccess();
    }, 700);
  };

  return (
    <>
      <div className="hero-band">
        <h1>Bayi Bilgi Formu</h1>
        <p>Lütfen aşağıdaki bilgileri eksiksiz ve doğru şekilde doldurunuz.</p>
      </div>
      <div className="form-page">
        <div className="form-card">
          <div className="section-header">
            <div className="section-icon">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <span className="section-title">Kişi & Firma Bilgileri</span>
          </div>
          <div className="input-group">
            <div className="field-wrap">
              <label className="field-label">Ad Soyad <span className="req">*</span></label>
              <input type="text" placeholder="Örn: Ahmet Yılmaz" value={adSoyad} onChange={e => setAdSoyad(e.target.value)} />
              {errors.adSoyad && <div className="ferr">⚠ {errors.adSoyad}</div>}
            </div>
            <div className="field-wrap">
              <label className="field-label">Firma Ünvanı <span className="req">*</span></label>
              <input type="text" placeholder="Örn: Yılmaz Klima San. Tic. Ltd. Şti." value={firma} onChange={e => setFirma(e.target.value)} />
              {errors.firma && <div className="ferr">⚠ {errors.firma}</div>}
            </div>
          </div>
        </div>

        <div className="form-card">
          <div className="section-header">
            <div className="section-icon">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
            </div>
            <span className="section-title">Fotoğraflar</span>
          </div>
          <div className="photo-grid">
            <div className={`photo-upload${disCephe ? " has-img" : ""}`} onClick={() => r1.current.click()}>
              <input type="file" accept="image/*" ref={r1} onChange={e => handlePhoto(e, setDisCephe)} />
              {disCephe ? (<>
                <img className="ph-preview" src={disCephe.preview} alt="" />
                <div className="ph-badge">Dış Cephe</div>
                <button className="ph-remove" onClick={ev => { ev.stopPropagation(); setDisCephe(null); }}>✕</button>
              </>) : (
                <div className="ph-placeholder">
                  <div className="ph-icon"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
                  <div className="ph-title">Dış Cephe</div>
                  <div className="ph-sub">Tıkla veya fotoğraf seç</div>
                </div>
              )}
            </div>
            <div className={`photo-upload${dukkanIci ? " has-img" : ""}`} onClick={() => r2.current.click()}>
              <input type="file" accept="image/*" ref={r2} onChange={e => handlePhoto(e, setDukkanIci)} />
              {dukkanIci ? (<>
                <img className="ph-preview" src={dukkanIci.preview} alt="" />
                <div className="ph-badge">Dükkan İçi</div>
                <button className="ph-remove" onClick={ev => { ev.stopPropagation(); setDukkanIci(null); }}>✕</button>
              </>) : (
                <div className="ph-placeholder">
                  <div className="ph-icon"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg></div>
                  <div className="ph-title">Dükkan İçi</div>
                  <div className="ph-sub">Tıkla veya fotoğraf seç</div>
                </div>
              )}
            </div>
          </div>
          {(errors.dis || errors.ici) && <div className="ferr" style={{marginTop:10}}>⚠ {errors.dis || errors.ici}</div>}
        </div>

        <div className="form-card">
          <div className="section-header">
            <div className="section-icon">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <span className="section-title">Konum Bilgisi</span>
          </div>
          <div className="loc-row">
            <div className={`loc-dot${coords ? " active" : gpsLoading ? " loading" : ""}`} />
            <span className={`loc-txt${coords ? " active" : ""}`}>
              {coords ? "✓ GPS konumu alındı" : gpsLoading ? "Konum alınıyor..." : "Henüz GPS konumu alınmadı"}
            </span>
          </div>
          {coords && <div className="loc-coords">📍 {coords.lat}, {coords.lng}</div>}
          <button className="gps-btn" onClick={getGPS} disabled={gpsLoading}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>
            {coords ? "Konumu Güncelle" : "GPS ile Konumumu Al"}
          </button>
          {gpsErr && <div className="ferr" style={{marginBottom:12}}>⚠ {gpsErr}</div>}
          <div className="or-div">veya Google Maps linki yapıştırın</div>
          <div className="field-wrap">
            <label className="field-label">Google Maps Linki</label>
            <input type="url" placeholder="https://maps.app.goo.gl/..." value={mapsLink} onChange={e => setMapsLink(e.target.value)} />
          </div>
          {errors.konum && <div className="ferr" style={{marginTop:10}}>⚠ {errors.konum}</div>}
        </div>

        <button className="submit-btn" onClick={submit} disabled={submitting}>
          {submitting ? "Gönderiliyor..." : "Bilgileri Gönder →"}
        </button>
      </div>
    </>
  );
}

function SuccessPage() {
  return (
    <div className="success-page">
      <div className="success-icon">✓</div>
      <h2 className="success-title">Bilgiler Gönderildi!</h2>
      <p className="success-sub">Teşekkürler. Bilgileriniz başarıyla iletildi.<br/>Herhangi bir konuda bize ulaşabilirsiniz.</p>
    </div>
  );
}

function AdminLogin({ onLogin }) {
  const [pw, setPw] = useState(""), [err, setErr] = useState("");
  const login = () => pw === ADMIN_PASSWORD ? onLogin() : setErr("Hatalı şifre. Lütfen tekrar deneyin.");
  return (
    <div className="admin-login">
      <div className="admin-card">
        <div className="admin-card-logo"><AirfelLogo height={44} /></div>
        <h2>Yönetici Girişi</h2>
        <p>Bayi verilerini görüntülemek için şifrenizi girin.</p>
        <div className="field-wrap">
          <label className="field-label">Şifre</label>
          <input type="password" placeholder="••••••••" value={pw} onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === "Enter" && login()} />
        </div>
        {err && <div className="err-banner">{err}</div>}
        <button className="submit-btn" style={{marginTop:20}} onClick={login}>Giriş Yap</button>
      </div>
    </div>
  );
}

function AdminPanel({ onLogout }) {
  const [subs] = useState(loadSubs);
  const [modalImg, setModalImg] = useState(null);

  const exportCSV = () => {
    const h = ["Ad Soyad","Firma Ünvanı","Enlem","Boylam","Maps Linki","Tarih"];
    const rows = subs.map(s => [s.adSoyad, s.firma, s.coords?.lat||"", s.coords?.lng||"", s.mapsLink||"", s.tarih]);
    const csv = [h,...rows].map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob(["\uFEFF"+csv], {type:"text/csv;charset=utf-8;"}));
    a.download = `airfel_bayiler_${new Date().toLocaleDateString("tr-TR").replace(/\./g,"-")}.csv`;
    a.click();
  };

  return (
    <div className="admin-panel">
      <div className="admin-top">
        <div className="admin-top-left">
          <AirfelLogo height={36} />
          <h2>Bayi Başvuruları</h2>
          <span className="cnt-badge">{subs.length} kayıt</span>
        </div>
        <div className="admin-top-right">
          {subs.length > 0 && <button className="export-btn" onClick={exportCSV}>↓ CSV İndir</button>}
          <button className="logout-btn" onClick={onLogout}>Çıkış</button>
        </div>
      </div>

      {subs.length === 0 ? (
        <div className="empty-state"><div className="empty-icon">📋</div><p>Henüz hiç başvuru bulunmuyor.</p></div>
      ) : (
        <div className="cards-grid">
          {subs.map(s => (
            <div className="bayi-card" key={s.id}>
              <div className="card-photos">
                <div className="card-photo" onClick={() => s.disCephe && setModalImg(s.disCephe.preview)}>
                  {s.disCephe ? <img src={s.disCephe.preview} alt="" /> : <span style={{fontSize:11,color:"#bbb"}}>Yok</span>}
                  <div className="cp-label">Dış Cephe</div>
                </div>
                <div className="card-photo" onClick={() => s.dukkanIci && setModalImg(s.dukkanIci.preview)}>
                  {s.dukkanIci ? <img src={s.dukkanIci.preview} alt="" /> : <span style={{fontSize:11,color:"#bbb"}}>Yok</span>}
                  <div className="cp-label">Dükkan İçi</div>
                </div>
              </div>
              <div className="card-body">
                <div className="card-firma">{s.firma}</div>
                <div className="card-ad">{s.adSoyad}</div>
                <div className="card-meta">
                  {s.coords && <div className="card-meta-item"><span>📍</span><a href={`https://www.google.com/maps?q=${s.coords.lat},${s.coords.lng}`} target="_blank" rel="noreferrer">{s.coords.lat}, {s.coords.lng}</a></div>}
                  {s.mapsLink && <div className="card-meta-item"><span>🔗</span><a href={s.mapsLink} target="_blank" rel="noreferrer">Google Maps Linki</a></div>}
                </div>
                <div className="card-date">{s.tarih}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalImg && (
        <div className="modal-overlay" onClick={() => setModalImg(null)}>
          <button className="modal-close" onClick={() => setModalImg(null)}>✕</button>
          <img className="modal-img" src={modalImg} alt="" />
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("form");
  return (
    <>
      <style>{style}</style>
      <div className="app">
        <div className="header">
          <AirfelLogo height={42} />
          {view !== "adminLogin" && view !== "admin" && (
            <button className="admin-btn" onClick={() => setView("adminLogin")}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Yönetici Girişi
            </button>
          )}
          {(view === "adminLogin" || view === "admin") && (
            <button className="admin-btn" onClick={() => setView("form")}>← Forma Dön</button>
          )}
        </div>
        {view === "form" && <BayiForm onSuccess={() => setView("success")} />}
        {view === "success" && <SuccessPage />}
        {view === "adminLogin" && <AdminLogin onLogin={() => setView("admin")} />}
        {view === "admin" && <AdminPanel onLogout={() => setView("adminLogin")} />}
      </div>
    </>
  );
}
