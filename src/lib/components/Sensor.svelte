<script>
	import Icon from '@iconify/svelte';

	export let title = 'Temperature';
	export let value = 0.0;
	export let icon = '';
</script>

<div class="w-full rounded-xl flex flex-col h-32 shadow-md border border-purple-800 bg-purple-50">
	<div class="p-2 border-b border-purple-800">
		<h3 class="text-right font-semibold text-lg text-gray-500">{title}</h3>
	</div>
	<div
		class="absoulte z-40 mx-2 -mt-4 rounded-full h-8 w-8 flex items-center bg-purple-500 justify-center"
	>
		<Icon class="text-lg text-purple-50" {icon} />
	</div>
	<div class="px-2">
		<p class="text-right text-4xl font-bold text-purple-800">{value.toPrecision(3)}</p>
	</div>
</div>
