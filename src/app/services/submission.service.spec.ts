import { TestBed } from "@angular/core/testing";

import { SubmissionsService } from "./submissions.service";

describe("SubmissionServiceService", () => {
  let service: SubmissionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmissionsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
