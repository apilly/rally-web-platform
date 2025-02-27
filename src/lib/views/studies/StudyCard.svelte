<script> 
 /* This Source Code Form is subject to the terms of the Mozilla Public
  * License, v. 2.0. If a copy of the MPL was not distributed with this
  * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* 
    NOTE: this is a full pattern integration of the study card. It uses the StudyCard, StudyCardHeader,
    and dialog components. This is the component to use _in practice_.

    It relies on props instead of slots to reduce the cost of use.
*/

import { createEventDispatcher, onMount } from 'svelte';
import StudyCard from '../../components/study-card/StudyCard.svelte';
import StudyCardHeader from '../../components/study-card/Header.svelte';
import Button from '../../components/Button.svelte';
import IRBWindow from '../irb/IRBWindow.svelte';
import GenericConsent from "../irb/GenericConsent.svelte";
import irb from "../irb";

export let joined = false;
export let connected = false;
export let imageSrc;
export let title = "Untitled Study";
export let author = "Author Unknown";
export let description = "no description.";
export let studyId;
export let endDate;
export let dataCollectionDetails;
export let studyDetailsLink;
export let tags;

const dispatch = createEventDispatcher();

let joinModal = false;

function triggerJoinEvent() {
    // send CTA click event to parent.
    dispatch('cta-clicked');
    joinModal = true;
}
let Dialog;
let mounted = false;
onMount(async () => {
    Dialog = (await import('$lib/components/Dialog.svelte')).default;
    mounted = true;
})

</script>

<StudyCard
    {joined}
    {connected}
    on:join={triggerJoinEvent}
    on:leave={triggerJoinEvent}
    {endDate}
    {dataCollectionDetails}
    {tags}
    {imageSrc}
    {studyDetailsLink}>
        <span slot="name">{title}</span>
        <span slot="author">{author}</span>
        <p slot="description">
        {description}
        </p>
</StudyCard>

{#if joinModal && mounted && Dialog}
    <Dialog
    height={joined ? undefined : "80vh"}
    topPadding={joined ? undefined : "calc(10vh - 20px)"}
    width={joined ? "var(--content-width)" : undefined}
    on:dismiss={() => {
        joinModal = false;
    }}>
    <!-- override the dialog Zilla font setting. -->
    <div slot="title">
        {#if !joined}
        <StudyCardHeader {endDate}>
            <img
            slot="study-icon"
            class="study-card-image"
            width="60"
            alt="study icon"
            src={imageSrc || "img/default-study-icon.png"} />
            <span slot="study-name">{title}</span>
            <span slot="study-author">{author}</span>
        </StudyCardHeader>
        {:else}Leave this Study?{/if}
    </div>
    <div class:split-content-modal={joined} slot="body">
        {#if !joined}
            <!-- FIXME Bake in the Princeton IRB. Once we have more studies, we will key this
                 by the study id.
            -->
                <IRBWindow>
                    {#if studyId in irb}
                        <svelte:component this={irb[studyId]} />
                    {:else}
                        <GenericConsent />
                    {/if}
                </IRBWindow>
        {:else}
                <div style="width: 368px;">
                    <p style="padding-top: 20px;">
                        You’re free to come and go as you please. Just to confirm, leaving a study means the following:
                    </p>
                    <ul  class="mzp-u-list-styled bigger-gap" style="padding-right: 48px;">
                        <li><b>You will only be leaving this specific study</b>.
                            If you are enrolled in other studies, data
                            collection will proceed as planned.
                        </li>
                        <li>
                            Researchers working on this study will <b>no longer receive data from you</b>, 
                            and we will <b>delete any study data that we’ve collected from you</b> to date.
                        </li>
                    </ul>
                </div>
                    <img style="width: 270px; padding-top: 20px; transform: translateX(-24px);" src="img/leave-this-study.png" alt="person considering leaving the study" />
        {/if}
    </div>
    <!-- if the leave study modal is present, shore up the button hheights -->
    <div class='modal-call-flow' slot="cta" style={`margin-top: ${joined ? "-50px" : "none"};`}>
        <Button
        size="lg"
        product
        leave={joined}
        on:click={() => {
            // send join event to parent.
            dispatch(!joined ? "join" : "leave");
            joinModal = false;
        }}>
        {#if joined}Leave Study{:else}Accept & Enroll{/if}
        </Button>
        <Button
        size="lg"
        product
        secondary
        on:click={() => {
            joinModal = false;
        }}>
        Cancel
        </Button>
    </div>
    </Dialog>
{/if}
