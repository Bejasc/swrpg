<template>
	<v-expansion-panels accordion>
		<v-expansion-panel class="overflow-auto">
			<v-expansion-panel-header>{{ event.embedOptions.title }}</v-expansion-panel-header>
			<div class="float-left" :style="`margin-top:-50px;background-color:${event.embedOptions.color};width:6px;height:100%`"></div>
			<v-expansion-panel-content>
				<v-expansion-panels>
					<v-expansion-panel>
						<v-expansion-panel-header class="blue-grey darken-1 font-weight-medium">Embed Options</v-expansion-panel-header>
						<v-expansion-panel-content>
							<v-form>
								<v-text-field v-model="event.embedOptions.title" label="Event Title" placeholder="Title"></v-text-field>
								<v-textarea v-model="event.embedOptions.description" label="Event Message" placeholder="Message"></v-textarea>
								<v-text-field v-model="event.embedOptions.thumbnail" label="Thumbnail URL" placeholder="Image URL"></v-text-field>
								<v-text-field v-model="event.embedOptions.img" label="Image URL" placeholder="Image URL"></v-text-field>
								<DrpgColorPicker :value="this.event.embedOptions.color" @colorUpdated="event.embedOptions.color = $event"></DrpgColorPicker>
							</v-form>
						</v-expansion-panel-content>
					</v-expansion-panel>
					<v-expansion-panel>
						<v-expansion-panel-header class="blue-grey darken-1 font-weight-medium">Event Links</v-expansion-panel-header>
						<v-expansion-panel-content>
							<EventLink v-for="(link, i) in event.eventLinks" :key="i" :eventLink="link"></EventLink>
							<div class="text-center">
								<v-btn class="ma-2" small outlined fab color="white" @click="addEventLink">
									<v-icon>mdi-plus</v-icon>
								</v-btn>
							</div>
						</v-expansion-panel-content>
					</v-expansion-panel>
				</v-expansion-panels>
			</v-expansion-panel-content>
		</v-expansion-panel>
	</v-expansion-panels>
</template>

<script lang="ts">
import Vue from "vue";
import { SwrpgEvent } from "@/types/Event";
import DrpgColorPicker from "@/components/DrpgColorPicker.vue";
import axios, { Axios } from "axios";
import { IItem } from "@/types/SwrpgTypes/Item";
import { getFromMongo } from "@/plugins/MongoConnector";

export default Vue.component("EventMain", {
	name: "EventMain",
	components: {
		DrpgColorPicker,
	},
	props: {
		event: SwrpgEvent,
	},
	mounted() {
		this.loadAllItems();
	},
	data: () => {
		return {
			items: [] as IItem[],
		};
	},
	methods: {
		addEventLink() {
			this.event.eventLinks.push({
				event: new SwrpgEvent(),
				optionText: "New Option",
				optionDescription: "",
			});
		},
		testEvent(obj: string) {
			this.event.embedOptions.color = obj;
		},
		async loadAllItems() {
			const i = await getFromMongo<IItem>("items");
			this.items.push(...i);
		},
	},
});
</script>
