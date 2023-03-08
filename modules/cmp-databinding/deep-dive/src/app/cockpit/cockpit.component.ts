import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';

@Component({
    selector: 'app-cockpit',
    templateUrl: './cockpit.component.html',
    styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent {
    @Output() serverCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
    @Output("bpCreated") blueprintCreated = new EventEmitter<{ serverName: string, serverContent: string }>();

    @ViewChild('serverContentInput') serverContentInput: ElementRef;

    onAddServer(serverName: string) {
        this.serverCreated.emit({
            serverName: serverName,
            serverContent: this.serverContentInput.nativeElement.value
        });
    }

    onAddBlueprint(serverName: string) {
        this.blueprintCreated.emit({
            serverName: serverName,
            serverContent: this.serverContentInput.nativeElement.value
        });
    }
}
