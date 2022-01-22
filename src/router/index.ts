import VueRouter, { RouteConfig } from "vue-router";

import Home from "@/views/Home.vue";
import Vue from "vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/docs",
		name: "Docs",
		component: () => import("@/views/Docs.vue"),
	},
	{
		path: "/tools",
		name: "Tools",
		component: () => import("@/views/Tools.vue"),
		children: [
			{
				path: "npc",
				name: "NPC Directory",
				component: () => import("@/views/Tools/NpcDirectory.vue"),
			},
			{
				path: "hook",
				name: "Hook Builder",
				component: () => import("@/views/Tools/HookBuilder.vue"),
			},
			{
				path: "item",
				name: "Quest Item Builder",
				component: () => import("@/views/Tools/QuestItemCreator.vue"),
			},
		],
	},
];

const router = new VueRouter({
	mode: "hash",
	base: process.env.BASE_URL,
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (to.hash) {
			return {
				selector: to.hash,
			};
		}
	},
});

export default router;
