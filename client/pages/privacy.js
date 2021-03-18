import React from 'react';

export default function privacy() {
  return (
    <div className={'privacyRoot'}>
      <img className={'logoImg'} src={'/DVD.png'}></img>
      <h1>隱私權政策與條款</h1>
      <p>1.此項聲明本網頁作者保留修改的權利，以做最適當地調整與變更，修改後將公佈在網站上，不另個別通知。如因此造成您的困擾，敬請見諒！</p>
      <p>2.網站的協力廠商功能</p>
      <p className="paddingL">
        A. YouTube:
        <p className="paddingL">YouTube API 服務可用來在網站上播放影片。有關服務和服務功能的更多資訊可在 <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener">YouTube 服務條款</a>取得，並在 <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google 隱私權政策</a>取得資訊使用的更多資訊。</p>
      </p>
    </div>
  )
}
