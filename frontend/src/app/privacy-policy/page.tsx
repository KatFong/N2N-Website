import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '条款与法律',
  description: 'N2N Connect 使用条款、法律声明与隐私说明。',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-3 text-4xl font-bold text-slate-900">条款、法律与隐私</h1>
        <p className="text-sm text-slate-500">最近更新：2026 年 3 月 27 日</p>
        <div className="mt-4 h-1 w-20 rounded-full bg-slate-900" />

        <div className="prose prose-lg mt-8 max-w-none text-slate-700">
          <h2>条款与条件</h2>
          <p>
            本网站信息仅供一般参考，可能随时更新而不另行通知。用户在依据任何内容采取行动前，应自行查阅最新版本的相关资料。
          </p>
          <h2>法律声明</h2>
          <p>
            本网站所载商标、内容与资料由 N2N Connect Bhd
            或其权利人所有。除法律允许的情形外，未经许可不得复制、传播或修改。
          </p>
          <h2>隐私说明</h2>
          <p>
            当您提交咨询或使用我们的服务时，我们可能会收集联系与使用信息。相关数据将用于提供支持、改进服务质量，并履行法律义务。
          </p>
          <h2>联络方式</h2>
          <p>
            法律或隐私相关咨询，请联系：
            <br />
            legal@n2nconnect.com
          </p>
        </div>
      </div>
    </main>
  );
}
