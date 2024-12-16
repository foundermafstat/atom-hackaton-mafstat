import { WalletConnect } from '@/components/WalletConnect';
import { AccountInfo } from '@/components/AccountInfo';

export default function Wallet() {
	return (
		<main className="min-h-screen flex flex-col items-center justify-center p-4 space-y-8">
			<div className="text-center space-y-4">
				<h1 className="text-4xl font-bold">Cosmos Web3 App</h1>
				<p className="text-muted-foreground">
					Connect your wallet to get started
				</p>
			</div>
			<WalletConnect />
			<AccountInfo />
		</main>
	);
}
