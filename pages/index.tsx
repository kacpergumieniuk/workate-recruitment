import { useEffect, useState } from 'react';

const Home = () => {
	const [ imageUrl, setImageUrl ] = useState<Array<string>>([]);
	const [ idCounter, setIdCounter ] = useState<number>(0);
	const [ loading, setLoading ] = useState<boolean>(true);

	const fetchData = async () => {
		setLoading(true);
		fetch(`https://picsum.photos/v2/list`).then((response) => response.json()).then((data) => {
			let temporaryArray = [];
			for (let x = idCounter; x < idCounter + 3; x++) {
				let url = data[x].url;
				let pathname = new URL(url).pathname;
				let split = pathname.split('/');
				let slug = split[2];
				temporaryArray.push(`http://source.unsplash.com/${slug}`);
			}
			setImageUrl(temporaryArray);
			setLoading(false);
		});
	};

	useEffect(
		() => {
			fetchData();
		},
		[ idCounter ]
	);

	return (
		<div className="flex flex-col items-center">
			<div className="flex items-center mt-20 justify-center mb-10">
				{imageUrl.map((imageUrl: string) => {
					return <img src={imageUrl} alt="" className="h-1/5 w-1/5 mx-5" />;
				})}
			</div>
			{!loading ? (
				<button
					className="text-xl font-bold hover:text-slate-400"
					onClick={() => {
						idCounter === 27 ? setIdCounter(0) : setIdCounter((prev) => prev + 3);
					}}
				>
					Load more
				</button>
			) : (
				<p className="text-xl font-bold">Loading...</p>
			)}
		</div>
	);
};

export default Home;
