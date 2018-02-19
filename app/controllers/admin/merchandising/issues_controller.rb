class Admin::Merchandising::IssuesController < Admin::AdminController
  def index
    @issues = Issue.includes(:writers, :artists, series: :publisher).paginate(page: params[:page])
  end

  def show
    @issue = Issue.find(params[:id])
  end

  def edit
    @issue = Issue.find(params[:id])
  end

  def update
    @issue = Issue.find(params[:id])
    @issue.title = params["issue"]["title"]
    respond_to do |format|
      if @issue.save
        format.js
        format.json { render json: @issue, status: :created, location: @issue }
      else
        format.json { render json: @issue.errors, status: :unprocessable_entity }
      end
    end
  end

  def delete
    @issue = Issue.find(params[:id])
    @issue.destroy
  end

  private
  def allowed_params
    params.require(:issue).permit(:title, :tag_list)
  end
end
