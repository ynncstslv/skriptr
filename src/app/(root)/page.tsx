import EditorPanel from './_components/EditorPanel';
import Header from './_components/Header';
import OutputPanel from './_components/OutputPanel';

export default function Home() {
	return (
		<div className="min-h-screen">
			<div className="max-w-[1800px] p-4 mx-auto">
				<Header />
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
					<EditorPanel />
					<OutputPanel />
				</div>
			</div>
		</div>
	);
}
