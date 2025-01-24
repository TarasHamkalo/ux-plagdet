import {Component, effect, Input, signal} from "@angular/core";
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListItem, MatListItemIcon, MatListItemTitle} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {Analysis} from "../../model/analysis";
import {DatePipe, DecimalPipe} from "@angular/common";
import {MatChip} from "@angular/material/chips";
import {MatTooltip} from "@angular/material/tooltip";
import {
  ConfigurationOptionsComponent
} from "../configuration-options/configuration-options.component";
import {AnalysisContextService} from "../../context/analysis-context.service";

@Component({
  selector: "app-analysis-info-card",
  imports: [
    MatIcon,
    MatList,
    MatListItem,
    MatDivider,
    MatListItemTitle,
    MatListItemIcon,
    DatePipe,
    DecimalPipe,
    MatChip,
    MatTooltip,
    ConfigurationOptionsComponent
  ],
  templateUrl: "./analysis-info-card.component.html",
  styleUrl: "./analysis-info-card.component.scss"
})
export class AnalysisInfoCardComponent {

  @Input() public supportiveText = "V tejto časti sa zobrazujú informácie o analýze a o tom, aké parametre sa pri nej použili";

  public analysis = signal<Analysis | undefined>(undefined);

  constructor(private analysisContext: AnalysisContextService) {
    effect(() => {
      const report = this.analysisContext.getReport()();
      this.analysis.set(report!.analysis);
    });
  }

  // ngOnInit() {
  // this.analysis.set(this.analysisContext.getReport()().analysis!);
  // }

}
