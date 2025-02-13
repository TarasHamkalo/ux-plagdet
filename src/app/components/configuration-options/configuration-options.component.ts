import {Component, computed, effect, Input, OnInit, signal} from "@angular/core";
import {AnalysisContextService} from "../../context/analysis-context.service";
import {ConfigurationOption} from "../../model/mock/configuration-option";
import {
  MatListItemLine,
  MatListItemTitle,
  MatListOption,
  MatSelectionList
} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatChip, MatChipListbox} from "@angular/material/chips";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: "app-configuration-options",
  imports: [
    MatListOption,
    MatListItemLine,
    MatSelectionList,
    MatDivider,
    MatIcon,
    MatIconButton,
    MatListItemTitle,
    MatChip,
    MatTooltip,
    MatChipListbox,
  ],
  templateUrl: "./configuration-options.component.html",
  styleUrl: "./configuration-options.component.css"
})
export class ConfigurationOptionsComponent implements OnInit {

  @Input() public title = "";

  @Input() public subTitle = "";

  @Input() public variant: "chip" | "select" = "select";

  public configurationOptions = signal<ConfigurationOption[]>([]);

  public selectedCount = computed(() => this.configurationOptions().reduce(
    (agg, cur) => agg + (cur.selected ? 1 : 0),
    0
  ));

  constructor(private analysisContextService: AnalysisContextService) {
    effect(() => {
      const analysis = this.analysisContextService.getReport()()!.analysis;
      if (analysis) {
        this.configurationOptions.set(analysis.configurationUsed);
      }
    });
  }

  ngOnInit() {
    this.configurationOptions = this.analysisContextService.getConfigurationOptions();

    this.title =
      this.variant === "chip" ? "Vlastnosti analýzy" : "Základné možnosti";
    this.subTitle =
      this.variant === "chip"
        ? "Vlastnosti nastavené počas procesu konfigurácie"
        : "";
  }

  toggleOption(targetOption: ConfigurationOption) {
    // this.analysisContextService.getConfigurationOptions().update(options =>
    this.configurationOptions.update(options =>
      options.map(option =>
        option.displayTitle === targetOption.displayTitle
          ? { ...option, selected: !option.selected }
          : option
      )
    );
  }

  resetToDefault() {
    this.configurationOptions.update(options =>
    // this.analysisContextService.getConfigurationOptions().update(options =>
      options.map(option => ({
        ...option,
        selected: option.selectByDefault,
      }))
    );
  }
}
